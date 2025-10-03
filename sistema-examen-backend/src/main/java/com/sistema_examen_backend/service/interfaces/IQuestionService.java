package com.sistema_examen_backend.service.interfaces;

import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.persistence.entity.Question;

import java.util.Set;

public interface IQuestionService {

    Question createQuestion(Question question);

    Question updateQuestion(Question question);

    Set<Question> getAllQuestions();

    Question getQuestion(Long questionId);

    Set<Question> getExamQuestions(Long exam);

    void deleteQuestion(Long questionId);
}
