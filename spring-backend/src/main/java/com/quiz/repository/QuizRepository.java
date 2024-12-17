package com.quiz.repository;

import com.quiz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByQuizId(String quizId);
}
