package com.quiz.repository;

import com.quiz.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findByQuizId(String quizId);
}
