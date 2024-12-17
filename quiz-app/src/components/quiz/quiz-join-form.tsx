'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function QuizJoinForm() {
  const [quizId, setQuizId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quizId.trim()) {
      toast.error('Please enter a quiz ID')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/quiz/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId }),
      })

      if (!response.ok) {
        throw new Error('Failed to join quiz')
      }

      const data = await response.json()
      toast.success('Successfully joined quiz!')
      router.push(`/quiz/${quizId}`)
    } catch (error) {
      toast.error('Failed to join quiz. Please try again.')
      console.error('Error joining quiz:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          disabled={isLoading}
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Joining...' : 'Join Quiz'}
      </Button>
    </form>
  )
}
