import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Participant } from "@/services/api"

interface LeaderboardProps {
  participants: Participant[]
}

export function Leaderboard({ participants }: LeaderboardProps) {
  const sortedParticipants = [...participants]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 hover:bg-yellow-600"
      case 2:
        return "bg-gray-400 hover:bg-gray-500"
      case 3:
        return "bg-amber-700 hover:bg-amber-800"
      default:
        return "bg-slate-600 hover:bg-slate-700"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedParticipants.map((participant, index) => (
              <TableRow key={participant.id}>
                <TableCell>
                  <Badge className={getRankBadgeColor(index + 1)}>
                    #{index + 1}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{participant.name}</TableCell>
                <TableCell className="text-right">
                  <span className="font-mono">{participant.score ?? 0}%</span>
                </TableCell>
              </TableRow>
            ))}
            {sortedParticipants.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No participants yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
