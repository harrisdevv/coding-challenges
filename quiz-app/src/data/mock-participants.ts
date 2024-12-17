import { Participant } from '@/services/api'
import { faker } from '@faker-js/faker'

type QuizId = 'VOCAB-101' | 'IDIOMS-202' | 'GRAMMAR-303'

// Create a stable set of participants
const createParticipant = (id: number, quizId: string, baseScore: number): Participant => ({
  id,
  name: faker.person.fullName(),
  quizId,
  score: baseScore - Math.floor(Math.random() * 5) // Add some score variation
})

const mockParticipantsByQuiz: Record<QuizId, Participant[]> = {
  'VOCAB-101': [
    createParticipant(1, 'VOCAB-101', 98),
    createParticipant(2, 'VOCAB-101', 95),
    createParticipant(3, 'VOCAB-101', 92),
    createParticipant(4, 'VOCAB-101', 90),
    createParticipant(5, 'VOCAB-101', 88),
  ],
  'IDIOMS-202': [
    createParticipant(6, 'IDIOMS-202', 96),
    createParticipant(7, 'IDIOMS-202', 94),
    createParticipant(8, 'IDIOMS-202', 91),
    createParticipant(9, 'IDIOMS-202', 89),
    createParticipant(10, 'IDIOMS-202', 87),
  ],
  'GRAMMAR-303': [
    createParticipant(11, 'GRAMMAR-303', 97),
    createParticipant(12, 'GRAMMAR-303', 93),
    createParticipant(13, 'GRAMMAR-303', 90),
    createParticipant(14, 'GRAMMAR-303', 88),
    createParticipant(15, 'GRAMMAR-303', 85),
  ],
};

// Set a fixed seed to ensure consistent names across reloads
faker.seed(123)

export const mockParticipants = Object.values(mockParticipantsByQuiz).flat();

export function getParticipantsByQuizId(quizId: QuizId): Participant[] {
  return mockParticipantsByQuiz[quizId] || [];
}
