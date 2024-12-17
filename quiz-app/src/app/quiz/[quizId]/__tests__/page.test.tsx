import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import QuizPage from '../page'
import { mockParticipants } from '@/data/mock-participants'

// Mock the useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

describe('QuizPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders quiz page with questions and participants', () => {
    render(<QuizPage params={{ quizId: '1' }} />)
    
    // Check if main components are rendered
    expect(screen.getByText(/Question/i)).toBeDefined()
    expect(screen.getByTestId('participant-list')).toBeDefined()
    expect(screen.getByTestId('leaderboard')).toBeDefined()
  })

  it('handles answer selection correctly', () => {
    render(<QuizPage params={{ quizId: '1' }} />)
    
    const radioButton = screen.getByLabelText(/First answer option/i)
    fireEvent.click(radioButton)
    
    expect(radioButton.checked).toBe(true)
  })

  it('submits quiz answers and redirects', async () => {
    const { getByText } = render(<QuizPage params={{ quizId: '1' }} />)
    
    // Select answers
    const radioButtons = screen.getAllByRole('radio')
    fireEvent.click(radioButtons[0])
    
    // Submit quiz
    const submitButton = getByText(/Submit/i)
    await act(async () => {
      fireEvent.click(submitButton)
    })
    
    // Verify redirect was called
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/quiz/join')
    })
  })

  it('updates participants list periodically', async () => {
    vi.useFakeTimers()
    
    render(<QuizPage params={{ quizId: '1' }} />)
    
    // Fast-forward 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    
    // Verify participants are updated
    await waitFor(() => {
      const participantsList = screen.getByTestId('participant-list')
      expect(participantsList).toHaveTextContent(mockParticipants[0].name)
    })
    
    vi.useRealTimers()
  })
})
