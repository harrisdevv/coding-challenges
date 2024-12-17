package com.quiz.controller;

import com.quiz.model.Participant;
import com.quiz.model.Quiz;
import com.quiz.repository.ParticipantRepository;
import com.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "http://localhost:3000") // For Next.js frontend
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private QuizRepository quizRepository;

    @PostMapping("/join")
    public ResponseEntity<?> joinQuiz(@RequestBody JoinQuizRequest request) {
        try {
            Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

            Participant participant = new Participant();
            participant.setQuiz(quiz);
            participant.setUserName(request.getUserName());
            
            Participant savedParticipant = participantRepository.save(participant);
            return ResponseEntity.ok(savedParticipant);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Failed to join quiz: " + e.getMessage());
        }
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<Participant>> getParticipantsByQuizId(@PathVariable String quizId) {
        Quiz quiz = quizRepository.findById(quizId)
            .orElseThrow(() -> new RuntimeException("Quiz not found"));
            
        List<Participant> participants = participantRepository.findByQuiz(quiz);
        return ResponseEntity.ok(participants);
    }
}

class JoinQuizRequest {
    private String quizId;
    private String userName;

    // Getters and Setters
    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
