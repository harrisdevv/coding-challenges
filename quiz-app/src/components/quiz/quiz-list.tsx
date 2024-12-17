'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Quiz, quizApi } from '@/services/api'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizApi.getAllQuizzes()
        setQuizzes(data)
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to fetch quizzes',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  const handleJoinQuiz = (quizId: string) => {
    router.push(`/quiz/${quizId}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-gray-500">Loading quizzes...</div>
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center text-gray-500">No quizzes available</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{quiz.title}</CardTitle>
              <Badge variant="outline" className="font-mono text-xs">
                {quiz.id}
              </Badge>
            </div>
            <CardDescription className="mt-2">{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button onClick={() => handleJoinQuiz(quiz.id)}>
              Join Quiz
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
