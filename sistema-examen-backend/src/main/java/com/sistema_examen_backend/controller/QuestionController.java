package com.sistema_examen_backend.controller;

import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.persistence.entity.Question;
import com.sistema_examen_backend.service.interfaces.IExamService;
import com.sistema_examen_backend.service.interfaces.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/questions")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private IQuestionService service;

    @Autowired
    private IExamService examService;

    @PostMapping("/save")
    public ResponseEntity<?> createQuestion(@RequestBody Question question){
        return new ResponseEntity<>(service.createQuestion(question), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question){
        return new ResponseEntity<>(service.updateQuestion(question), HttpStatus.OK);
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<?> getQuestionsExam(@PathVariable long examId){
        Exam exam = examService.getExam(examId);
        Set<Question> questions = exam.getQuestions();

        List exams = new ArrayList(questions);
        if (exams.size() > Integer.parseInt(exam.getNumberQuestions())){
            exams = exams.subList(0, Integer.parseInt(exam.getNumberQuestions() + 1));
        }

        Collections.shuffle(exams);
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }

    @GetMapping("/all/{questionId}")
    public ResponseEntity<Question> allQuestionById(@PathVariable long questionId){
        return new ResponseEntity<>(service.getQuestion(questionId),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{questionId}")
    public ResponseEntity<Void> deleteQuestionById(@PathVariable long questionId){
        service.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
