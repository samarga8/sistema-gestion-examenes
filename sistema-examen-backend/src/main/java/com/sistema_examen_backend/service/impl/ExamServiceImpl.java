package com.sistema_examen_backend.service.impl;

import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.persistence.repository.ExamRepository;
import com.sistema_examen_backend.service.interfaces.IExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class ExamServiceImpl implements IExamService {

    @Autowired
    private ExamRepository examRepository;

    @Override
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public Exam updateExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public Set<Exam> getAllExams() {
        return new LinkedHashSet<>(examRepository.findAll());
    }

    @Override
    public Exam getExam(Long examId) {
        return examRepository.findById(examId).get();
    }

    @Override
    public void deleteExam(Long examId) {
        examRepository.deleteById(examId);
    }
}
