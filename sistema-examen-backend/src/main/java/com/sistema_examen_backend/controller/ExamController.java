package com.sistema_examen_backend.controller;


import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.service.interfaces.IExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exams")
@CrossOrigin("*")
public class ExamController {

    @Autowired
    private IExamService service;

    @PostMapping("/create")
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam){
        return new ResponseEntity<>(service.createExam(exam), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateExam(@RequestBody Exam exam){
        return new ResponseEntity<>(service.updateExam(exam), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> allExams(){
        return new ResponseEntity<>(service.getAllExams(),HttpStatus.OK);
    }

    @GetMapping("/get/{examId}")
    public ResponseEntity<Exam> getExamById(@PathVariable long examId){
        return new ResponseEntity<>(service.getExam(examId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{examId}")
    public ResponseEntity<Void> deleteExam(@PathVariable long examId){
        service.deleteExam(examId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
