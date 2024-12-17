export interface Quiz {
  id: number;
  quizId: string;
  title: string;
  description: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface Participant {
  id: string;
  userName: string;
  joinedAt: string;
}
