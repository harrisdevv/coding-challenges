package com.quiz.controller;

import com.quiz.model.JoinQuizRequest;
import com.quiz.model.Participant;
import com.quiz.model.Quiz;
import com.quiz.repository.ParticipantRepository;
import com.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "http://localhost:3000")
public class ParticipantController {
    private static final Logger logger = LoggerFactory.getLogger(ParticipantController.class);

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private QuizRepository quizRepository;

    @PostMapping("/join")
    public ResponseEntity<?> joinQuiz(@RequestBody JoinQuizRequest request) {
        logger.info("Received join request for quiz ID: {} from user: {}", request.getQuizId(), request.getUserName());
        
        // Check if quiz exists
        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElse(null);
        
        if (quiz == null) {
            logger.error("Quiz not found with ID: {}", request.getQuizId());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Quiz not found with ID: " + request.getQuizId());
            return ResponseEntity.badRequest().body(errorResponse);
        }

        logger.info("Found quiz: {}", quiz.getTitle());

        // Create new participant
        Participant participant = new Participant();
        participant.setQuizId(request.getQuizId());
        participant.setName(request.getUserName());
        participant.setScore(0); // Initial score is 0

        // Save participant
        Participant savedParticipant = participantRepository.save(participant);
        logger.info("Created new participant with ID: {}", savedParticipant.getId());
        return ResponseEntity.ok(savedParticipant);
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<Participant>> getParticipantsByQuizId(@PathVariable String quizId) {
        List<Participant> participants = participantRepository.findByQuizId(quizId);
        logger.info("Found {} participants for quiz ID: {}", participants.size(), quizId);
        return ResponseEntity.ok(participants);
    }
}
