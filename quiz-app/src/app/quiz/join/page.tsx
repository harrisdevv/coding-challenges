import { QuizJoinForm } from '@/components/quiz/quiz-join-form'
import { QuizList } from '@/components/quiz/quiz-list'
import { Leaderboard } from "@/components/quiz/leaderboard";
import { getParticipantsByQuizId } from "@/data/mock-participants";

export default function QuizJoinPage() {
  // Using mock data for now
  const participants = getParticipantsByQuizId("QUIZ001");

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Available Quizzes</h1>
          <p className="mt-2 text-gray-600">
            Join a quiz by entering its ID or selecting from the list below
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Join by ID</h2>
            <QuizJoinForm />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Available Quizzes</h2>
            <QuizList />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
            <Leaderboard participants={participants} />
          </div>
        </div>
      </div>
    </main>
  )
}
