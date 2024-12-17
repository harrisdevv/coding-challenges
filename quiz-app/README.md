# Quiz Application

A real-time English learning platform built with Next.js and Spring Boot. The application enables users to participate in interactive quizzes while tracking progress through a real-time leaderboard system.

## Overview

The application consists of two main components:

- **Frontend**: Next.js application with modern UI components and real-time updates
- **Backend**: Spring Boot REST API handling quiz logic and participant management

## Features

- Interactive quiz participation with multiple-choice questions
- Real-time participant tracking and leaderboard
- Modern, responsive user interface using shadcn/ui components
- Server-side rendering and optimized performance with Next.js
- RESTful API integration with proper error handling
- TypeScript support for enhanced type safety

## Setup and Installation

### Frontend

Prerequisites:
- Node.js 16.x or higher
- npm or yarn package manager

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend

Prerequisites:
- Java 17 or higher
- Maven 3.x

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

## Environment Variables

```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Backend (application.properties)
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/quiz_db
```

## Testing

The project includes comprehensive unit tests for critical components. Run the tests using:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

Key test suites:
- `QuizPage`: Tests quiz functionality, answer selection, and submission
- `Leaderboard`: Tests participant sorting and display
- `ParticipantList`: Tests participant rendering and updates

## Code Quality Guidelines

### Performance Optimization
- Implemented React.memo for components that receive stable props
- Used proper React hooks dependencies to prevent unnecessary re-renders
- Implemented polling with appropriate intervals for real-time updates
- Utilized Next.js Image component for optimized image loading

### Code Organization
- Components follow single responsibility principle
- Shared utilities and types are centralized
- Consistent file and folder structure
- Clear separation of concerns between components

### Best Practices
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Proper error handling and loading states
- Responsive design patterns
- Accessibility considerations with ARIA labels
