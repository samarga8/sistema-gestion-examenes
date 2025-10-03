package com.sistema_examen_backend.controller;

import com.sistema_examen_backend.controller.dto.ExamResponseDTO;
import com.sistema_examen_backend.controller.dto.QuestionDTO;
import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.persistence.entity.Question;
import com.sistema_examen_backend.persistence.repository.ExamRepository;
import com.sistema_examen_backend.service.interfaces.IExamService;
import com.sistema_examen_backend.service.interfaces.IQuestionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/questions")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private IQuestionService service;

    @Autowired
    private IExamService examService;

    @Autowired
    private ExamRepository examRepository;

    private static ModelMapper modelMapper = new ModelMapper();

    @PostMapping("/save")
    public ResponseEntity<?> createQuestion(@RequestBody Question question){
        return new ResponseEntity<>(service.createQuestion(question), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question){
        return new ResponseEntity<>(service.updateQuestion(question), HttpStatus.OK);
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsExam(@PathVariable long examId) {
        Exam exam = examRepository.findById(examId).get();
        Set<Question> questions = exam.getQuestions();

        List<Question> shuffledQuestions = new ArrayList<>(questions);
        if (shuffledQuestions.size() > exam.getNumberQuestions()) {
            shuffledQuestions = shuffledQuestions.subList(0, exam.getNumberQuestions());
        }

        Collections.shuffle(shuffledQuestions);

        // Convertir a DTOs
        List<QuestionDTO> dtoList = shuffledQuestions.stream().map(q -> {
            QuestionDTO dto = new QuestionDTO();
            dto.setQuestionId(q.getQuestionId());
            dto.setContent(q.getContent());
            dto.setOption1(q.getOption1());
            dto.setOption2(q.getOption2());
            dto.setOption3(q.getOption3());
            dto.setOption4(q.getOption4());
            dto.setAnswer(q.getAnswer());
            return dto;
        }).toList();

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
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

    @GetMapping("/exam/all/{examId}")
    public ResponseEntity<?> listQuestionsExamAdmin(@PathVariable Long examId){
        Set<Question> questionsEntities = service.getExamQuestions(examId);

        Set<QuestionDTO> questionsDto = new HashSet<>();
        for (Question question : questionsEntities) {
            QuestionDTO dto = new QuestionDTO();
            dto.setQuestionId(question.getQuestionId());
            dto.setContent(question.getContent());
            dto.setOption1(question.getOption1());
            dto.setOption2(question.getOption2());
            dto.setOption3(question.getOption3());
            dto.setOption4(question.getOption4());
            dto.setAnswer(question.getAnswer());

            // Mapea el exam si quieres, o solo asigna examId para prueba
            ExamResponseDTO examDto = new ExamResponseDTO();
            examDto.setExamId(question.getExam().getExamId());
            examDto.setTitle(question.getExam().getTitle());
            dto.setExam(examDto);

            questionsDto.add(dto);
        }

        System.out.println("Questions DTO: " + questionsDto);
        return new ResponseEntity<>(questionsDto, HttpStatus.OK);
    }






}
