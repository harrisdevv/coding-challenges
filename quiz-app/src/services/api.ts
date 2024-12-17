const API_BASE_URL = 'http://localhost:8080/api';

export interface JoinQuizRequest {
  quizId: string;
  userName: string;
}

export interface Participant {
  id: number;
  quizId: string;
  userName: string;
  score?: number;
}

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
        throw new Error(typeof data === 'string' ? data : 'Failed to join quiz');
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

      if (!response.ok) {
        throw new Error('Failed to fetch participants');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw error;
    }
  },
};
