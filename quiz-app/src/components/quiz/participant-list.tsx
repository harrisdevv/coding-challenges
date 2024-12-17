'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Participant } from '@/services/api'

interface ParticipantListProps {
  participants: Participant[]
}

export function ParticipantList({ participants }: ParticipantListProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getAvatarUrl = (id: number) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Participants</CardTitle>
        <CardDescription>
          {participants.length} {participants.length === 1 ? "person" : "people"} in this quiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={getAvatarUrl(participant.id)} />
                  <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {participant.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Score: {participant.score ?? 0}%
                  </p>
                </div>
              </div>
            </div>
          ))}
          {participants.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No participants yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
