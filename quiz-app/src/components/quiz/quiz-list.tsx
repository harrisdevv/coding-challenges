'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { Quiz } from '@/types/quiz'

// Mock data for development
const mockQuizzes: Quiz[] = [
  {
    id: 1,
    quizId: 'VOCAB-101',
    title: 'Basic English Vocabulary',
    description: 'Test your knowledge of common English words'
  },
  {
    id: 2,
    quizId: 'IDIOMS-202',
    title: 'English Idioms',
    description: 'Learn common English idioms and their meanings'
  },
  {
    id: 3,
    quizId: 'GRAMMAR-303',
    title: 'Grammar Essentials',
    description: 'Practice essential English grammar rules'
  }
]

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulating API call with mock data
    const fetchQuizzes = async () => {
      try {
        // In production, this would be a real API call
        // const response = await fetch('http://localhost:8080/api/quizzes')
        // const data = await response.json()
        setQuizzes(mockQuizzes)
      } catch (error) {
        console.error('Error fetching quizzes:', error)
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
    return <div className="text-center">Loading quizzes...</div>
  }

  return (
    <div className="grid gap-4">
      {quizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">ID: {quiz.quizId}</span>
              <Button 
                onClick={() => handleJoinQuiz(quiz.quizId)}
                variant="outline"
              >
                Join Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
