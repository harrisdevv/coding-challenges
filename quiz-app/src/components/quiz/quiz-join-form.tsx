'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { participantApi, quizApi } from '@/services/api'

export function QuizJoinForm() {
  const [quizId, setQuizId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!userName.trim()) {
        toast({
          title: "Error",
          description: "Please enter your name.",
          variant: "destructive",
        })
        return
      }

      // First check if quiz exists
      await quizApi.getQuizById(quizId)

      // Then join the quiz
      await participantApi.joinQuiz({
        quizId,
        userName: userName.trim(),
      })

      toast({
        title: "Success!",
        description: "Successfully joined the quiz.",
      })

      // Redirect to the quiz page
      router.push(`/quiz/${quizId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Joining..." : "Join Quiz"}
      </Button>
    </form>
  )
}
