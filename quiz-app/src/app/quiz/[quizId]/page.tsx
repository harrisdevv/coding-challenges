import { ParticipantList } from '@/components/quiz/participant-list'

interface QuizPageProps {
  params: {
    quizId: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Quiz Session</h1>
          <p className="mt-2 text-gray-600">
            Quiz ID: {params.quizId}
          </p>
        </div>
        <ParticipantList quizId={params.quizId} />
      </div>
    </main>
  )
}
