export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export const mockQuestions: Question[] = [
  {
    id: "q1",
    quizId: "e29f3c8e-8495-4d4c-b8a0-b5c1b6a3d954",
    text: "Which of these is a correct sentence?",
    options: [
      "He don't like pizza",
      "He doesn't likes pizza",
      "He doesn't like pizza",
      "He not like pizza"
    ],
    correctAnswer: "He doesn't like pizza"
  },
  {
    id: "q2",
    quizId: "e29f3c8e-8495-4d4c-b8a0-b5c1b6a3d954",
    text: "What is the past tense of 'eat'?",
    options: ["eat", "ate", "eaten", "eating"],
    correctAnswer: "ate"
  },
  {
    id: "q3",
    quizId: "e29f3c8e-8495-4d4c-b8a0-b5c1b6a3d954",
    text: "Choose the correct article: '__ university is a great place to study.'",
    options: ["A", "An", "The", "No article needed"],
    correctAnswer: "A"
  }
];

export function getQuestionsByQuizId(quizId: string): Question[] {
  return mockQuestions.filter(q => q.quizId === quizId);
}
