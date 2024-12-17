'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockQuizzes } from "@/data/mock-quizzes";
import { Badge } from "@/components/ui/badge";

export function QuizList() {
  return (
    <div className="grid gap-4">
      {mockQuizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{quiz.title}</CardTitle>
              <Badge variant="outline" className="font-mono text-xs">
                {quiz.uuid}
              </Badge>
            </div>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {quiz.participants} participants
            </p>
            <Link href={`/quiz/${quiz.uuid}`}>
              <Button>Join Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
