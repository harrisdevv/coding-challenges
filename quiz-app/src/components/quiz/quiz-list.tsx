'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock quiz data
const mockQuizzes = [
  {
    id: "QUIZ001",
    title: "English Grammar Basics",
    description: "Test your knowledge of basic English grammar rules",
    participants: 45,
  },
  {
    id: "QUIZ002",
    title: "Vocabulary Challenge",
    description: "Expand your English vocabulary with this challenging quiz",
    participants: 32,
  },
  {
    id: "QUIZ003",
    title: "Business English",
    description: "Learn essential business English terms and phrases",
    participants: 28,
  },
];

export function QuizList() {
  return (
    <div className="grid gap-4">
      {mockQuizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {quiz.participants} participants
            </p>
            <Link href={`/quiz/${quiz.id}`}>
              <Button>Join Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
