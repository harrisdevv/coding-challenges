'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getQuizByUuid } from '@/data/mock-quizzes'
import { toast } from '@/hooks/use-toast'
import { participantApi } from '@/services/api'

export function QuizJoinForm() {
  const [quizId, setQuizId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check if quiz exists in mock data
      const quiz = getQuizByUuid(quizId)
      
      if (!quiz) {
        toast({
          title: "Error",
          description: "Quiz not found. Please check the ID and try again.",
          variant: "destructive",
        })
        return
      }

      if (!userName.trim()) {
        toast({
          title: "Error",
          description: "Please enter your name.",
          variant: "destructive",
        })
        return
      }

      // Call the backend API to join the quiz
      await participantApi.joinQuiz({
        quizId,
        userName: userName.trim(),
      })

      toast({
        title: "Success!",
        description: "Successfully joined the quiz.",
      })

      // Redirect to quiz page
      router.push(`/quiz/${quizId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Joining...' : 'Join Quiz'}
        </Button>
      </div>
    </form>
  )
}
