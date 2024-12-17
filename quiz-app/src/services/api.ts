const API_BASE_URL = 'http://localhost:8080/api';

export interface JoinQuizRequest {
  quizId: string;
  userName: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions?: Question[];
}

export interface Question {
  id: number;
  questionText: string;
  correctAnswer: string;
  options: string[];
  quizId: string;
}

export interface Participant {
  id: number;
  quizId: string;
  name: string;
  score?: number;
}

export interface ApiError {
  error: string;
}

export const quizApi = {
  getAllQuizzes: async (): Promise<Quiz[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ApiError).error || 'Failed to fetch quizzes');
      }

      return data;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  },

  getQuizById: async (quizId: string): Promise<Quiz> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ApiError).error || 'Failed to fetch quiz');
      }

      return data;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      throw error;
    }
  },
};

export const participantApi = {
  joinQuiz: async (request: JoinQuizRequest): Promise<Participant> => {
    try {
      const response = await fetch(`${API_BASE_URL}/participants/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ApiError).error || 'Failed to join quiz');
      }

      return data;
    } catch (error) {
      console.error('Error joining quiz:', error);
      throw error;
    }
  },

  getParticipants: async (quizId: string): Promise<Participant[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/participants/quiz/${quizId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ApiError).error || 'Failed to fetch participants');
      }

      return data;
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw error;
    }
  }
};
