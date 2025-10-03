package com.sistema_examen_backend.controller;


import com.sistema_examen_backend.controller.dto.ExamRequestDTO;
import com.sistema_examen_backend.controller.dto.ExamResponseDTO;
import com.sistema_examen_backend.controller.dto.ExamUpdateRequestDTO;
import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.service.interfaces.IExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/exams")
@CrossOrigin("*")
public class ExamController {

    @Autowired
    private IExamService service;

    @PostMapping("/create")
    public ResponseEntity<?> createExam(@RequestBody ExamRequestDTO exam){
        return new ResponseEntity<>(service.createExam(exam), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ExamResponseDTO> updateExam(@RequestBody ExamUpdateRequestDTO exam){
        return new ResponseEntity<>(service.updateExam(exam), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Set<ExamResponseDTO>> allExams(){
        return new ResponseEntity<>(service.getAllExams(),HttpStatus.OK);
    }

    @GetMapping("/get/{examId}")
    public ResponseEntity<ExamResponseDTO> getExamById(@PathVariable long examId){
        return new ResponseEntity<>(service.getExam(examId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{examId}")
    public ResponseEntity<Void> deleteExam(@PathVariable long examId){
        service.deleteExam(examId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
