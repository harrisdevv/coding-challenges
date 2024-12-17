export interface Participant {
  id: number;
  userName: string;
  quizId: string;
  score: number;
  rank?: number;
}

export const mockParticipants: Participant[] = [
  { id: 1, userName: "John Doe", quizId: "QUIZ001", score: 95 },
  { id: 2, userName: "Alice Smith", quizId: "QUIZ001", score: 88 },
  { id: 3, userName: "Bob Johnson", quizId: "QUIZ001", score: 92 },
  { id: 4, userName: "Emma Wilson", quizId: "QUIZ001", score: 85 },
  { id: 5, userName: "Michael Brown", quizId: "QUIZ001", score: 90 },
];

export function getParticipantsByQuizId(quizId: string): Participant[] {
  return mockParticipants
    .filter(p => p.quizId === quizId)
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      ...p,
      rank: index + 1
    }));
}
