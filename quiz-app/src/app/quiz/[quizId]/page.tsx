'use client'

import { useEffect, useState } from 'react'
import { redirect, useParams } from 'next/navigation'
import { Leaderboard } from '@/components/quiz/leaderboard'
import { ParticipantList } from '@/components/quiz/participant-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Quiz, Participant, quizApi, participantApi } from '@/services/api'
import { getParticipantsByQuizId } from '@/data/mock-participants'
import { toast } from '@/hooks/use-toast'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const QUIZ_IDS = ['VOCAB-101', 'IDIOMS-202', 'GRAMMAR-303'] as const
type ValidQuizId = typeof QUIZ_IDS[number]

const isValidQuizId = (quizId: string): quizId is ValidQuizId => {
  return QUIZ_IDS.includes(quizId as ValidQuizId)
}

export default function QuizPage() {
  const params = useParams()
  const quizId = params.quizId as ValidQuizId
  
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const quizData = await quizApi.getQuizById(quizId)
        setQuiz(quizData)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch quiz data'
        setError(message)
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    const fetchParticipants = async () => {
      try {
        const participantsData = await participantApi.getParticipants(quizId)
        
        // Use mock data if no participants are found
        if (participantsData.length === 0 && isValidQuizId(quizId)) {
          const mockData = getParticipantsByQuizId(quizId)
          setParticipants(mockData)
        } else {
          setParticipants(participantsData)
        }
      } catch (err) {
        console.error('Error fetching participants:', err)
      }
    }

    fetchQuizData()
    fetchParticipants()

    // Poll for new participants every 5 seconds
    const interval = setInterval(fetchParticipants, 5000)
    return () => clearInterval(interval)
  }, [quizId])

  const handleAnswerSelect = (questionId: number, value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleSubmit = () => {
    console.log('Selected answers:', selectedAnswers)
    toast({
      title: 'Quiz Submitted',
      description: 'Your answers have been recorded.',
    })
    redirect('/quiz/join')
  }

  if (isLoading) {
    return <div>Loading quiz...</div>
  }

  if (error || !quiz) {
    return <div>Error: {error || 'Quiz not found'}</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Quiz Header */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{quiz.description}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        {/* Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-8">
                {quiz.questions?.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium leading-none">
                          {question.questionText}
                        </h3>
                      </div>
                    </div>
                    <RadioGroup
                      value={selectedAnswers[question.id]}
                      onValueChange={(value) => handleAnswerSelect(question.id, value)}
                      className="ml-12 space-y-3"
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option}
                            id={`q${question.id}-option${optionIndex}`}
                          />
                          <Label
                            htmlFor={`q${question.id}-option${optionIndex}`}
                            className="text-sm"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSubmit}>Submit Answers</Button>
            </div>
          </CardContent>
        </Card>

        {/* Participants Section */}
        <div className="space-y-6">
          <ScrollArea className="h-[300px]">
            <Leaderboard participants={participants} />
          </ScrollArea>
          <ScrollArea className="h-[300px]">
            <ParticipantList participants={participants} />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
