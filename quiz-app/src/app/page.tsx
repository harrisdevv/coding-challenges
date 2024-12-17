import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome to English Quiz!</CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Test your English knowledge with our interactive quizzes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground mb-4">
            Join our quiz platform to improve your English skills through fun and engaging quizzes.
            Compete with other learners and track your progress!
          </p>
          <Link href="/quiz/join" className="w-full max-w-xs">
            <Button className="w-full" size="lg">
              Join a Quiz
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
