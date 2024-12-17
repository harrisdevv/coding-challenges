'use client'

import { useEffect, useState } from 'react'

interface Participant {
  id: string
  userName: string
  joinedAt: string
}

interface ParticipantListProps {
  quizId: string
}

export function ParticipantList({ quizId }: ParticipantListProps) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/quiz/${quizId}/participants`)
        if (!response.ok) {
          throw new Error('Failed to fetch participants')
        }
        const data = await response.json()
        setParticipants(data)
      } catch (error) {
        setError('Failed to load participants')
        console.error('Error fetching participants:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchParticipants()
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchParticipants, 5000)
    return () => clearInterval(interval)
  }, [quizId])

  if (isLoading) {
    return <div className="text-center">Loading participants...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Participants ({participants.length})</h2>
      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span>{participant.userName}</span>
            <span className="text-sm text-gray-500">
              {new Date(participant.joinedAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        {participants.length === 0 && (
          <div className="text-center text-gray-500">
            No participants yet
          </div>
        )}
      </div>
    </div>
  )
}
