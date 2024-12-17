export interface Quiz {
  id: string;
  title: string;
  description: string;
  participants: number;
  uuid: string;
}

export const mockQuizzes: Quiz[] = [
  {
    id: "QUIZ001",
    uuid: "e29f3c8e-8495-4d4c-b8a0-b5c1b6a3d954",
    title: "English Grammar Basics",
    description: "Test your knowledge of basic English grammar rules",
    participants: 45,
  },
  {
    id: "QUIZ002",
    uuid: "f7d9a2b1-6c4e-4f8a-9d3b-e8c7f5a2b1d0",
    title: "Vocabulary Challenge",
    description: "Expand your English vocabulary with this challenging quiz",
    participants: 32,
  },
  {
    id: "QUIZ003",
    uuid: "c5e8d2f4-7b6a-4c9d-8e3f-a2b1c9d8e7f6",
    title: "Business English",
    description: "Learn essential business English terms and phrases",
    participants: 28,
  },
];

export function getQuizByUuid(uuid: string): Quiz | undefined {
  return mockQuizzes.find(quiz => quiz.uuid === uuid);
}
