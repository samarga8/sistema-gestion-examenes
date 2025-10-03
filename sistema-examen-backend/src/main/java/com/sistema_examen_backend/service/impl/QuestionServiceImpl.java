package com.sistema_examen_backend.service.impl;

import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.persistence.entity.Question;
import com.sistema_examen_backend.persistence.repository.QuestionRepository;
import com.sistema_examen_backend.service.interfaces.IQuestionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class QuestionServiceImpl implements IQuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Set<Question> getAllQuestions() {
        return (Set<Question>) questionRepository.findAll();
    }

    @Override
    public Question getQuestion(Long questionId) {
        return questionRepository.findById(questionId).get();
    }

    @Override
    @Transactional
    public Set<Question> getExamQuestions(Long exam) {
        return questionRepository.findByExam_ExamId(exam);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
    }
}
