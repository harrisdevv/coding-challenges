'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { participantApi, Participant } from '@/services/api'

interface ParticipantListProps {
  quizId: string
}

export function ParticipantList({ quizId }: ParticipantListProps) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await participantApi.getParticipants(quizId)
        setParticipants(data)
      } catch (error) {
        console.error('Error fetching participants:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchParticipants()

    // Poll for new participants every 5 seconds
    const interval = setInterval(fetchParticipants, 5000)
    return () => clearInterval(interval)
  }, [quizId])

  if (isLoading) {
    return <div>Loading participants...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
        <CardDescription>Current quiz participants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {participants.map((participant) => (
            <Card key={participant.id}>
              <CardHeader>
                <CardTitle>{participant.userName}</CardTitle>
                <CardDescription>Score: {participant.score || 0}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
