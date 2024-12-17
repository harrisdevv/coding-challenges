import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuizPage from '../page'

// Create mocks for next/navigation
const mockRouter = {
  push: jest.fn(),
}

const mockRedirect = jest.fn()

const mockParams = {
  quizId: 'VOCAB-101'
}

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useParams: () => mockParams,
  redirect: (path: string) => mockRedirect(path),
}))

// Mock API services
jest.mock('@/services/api', () => ({
  quizApi: {
    getQuizById: jest.fn(() => Promise.resolve({
      id: 'VOCAB-101',
      title: 'Test Quiz',
      questions: [
        {
          id: 1,
          questionText: 'What is the capital of France?',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
        },
      ],
    })),
  },
  participantApi: {
    getParticipants: jest.fn(() => Promise.resolve([])),
  },
}))

// Mock toast
jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn(),
}))

describe('Quiz Page Functionality', () => {
  beforeEach(() => {
    mockRouter.push.mockClear()
    mockRedirect.mockClear()
  })

  it('should allow submitting answers', async () => {
    render(<QuizPage />)
    
    // Wait for the quiz to load
    await waitFor(() => {
      expect(screen.queryByText('Loading quiz...')).not.toBeInTheDocument()
    })
    
    // Select an answer
    const parisOption = screen.getByLabelText('Paris')
    fireEvent.click(parisOption)
    
    // Find and click the submit button
    const submitButton = screen.getByRole('button', { name: /submit answers/i })
    fireEvent.click(submitButton)
    
    // Verify redirect after submission
    expect(mockRedirect).toHaveBeenCalledWith('/quiz/join')
  })
})
