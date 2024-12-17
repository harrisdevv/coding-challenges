import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Participant } from "@/data/mock-participants";

interface LeaderboardProps {
  participants: Participant[];
}

export function Leaderboard({ participants }: LeaderboardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">
                  {participant.rank}
                  {participant.rank === 1 && " 🏆"}
                  {participant.rank === 2 && " 🥈"}
                  {participant.rank === 3 && " 🥉"}
                </TableCell>
                <TableCell>{participant.userName}</TableCell>
                <TableCell className="text-right">{participant.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
