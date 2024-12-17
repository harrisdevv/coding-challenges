'use client'

import { useParams } from 'next/navigation'
import { Leaderboard } from '@/components/quiz/leaderboard'
import { getParticipantsByQuizId } from '@/data/mock-participants'
import { getQuestionsByQuizId } from '@/data/mock-questions'
import { getQuizByUuid } from '@/data/mock-quizzes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function QuizPage() {
  const params = useParams()
  const quizId = params.quizId as string
  
  const quiz = getQuizByUuid(quizId)
  const questions = getQuestionsByQuizId(quizId)
  const participants = getParticipantsByQuizId(quizId)

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500">Quiz not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Quiz Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-muted-foreground">{quiz.description}</p>
        </div>

        {/* Leaderboard */}
        <div className="mb-8">
          <Leaderboard participants={participants} />
        </div>

        {/* Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="font-semibold">
                      Question {index + 1}: {question.text}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center p-3 border rounded-lg hover:bg-accent cursor-pointer"
                        >
                          <span className="mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Participants List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="p-3 border rounded-lg bg-background flex items-center gap-2"
                >
                  <span className="font-medium">{participant.userName}</span>
                  <span className="text-sm text-muted-foreground">
                    Score: {participant.score}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
