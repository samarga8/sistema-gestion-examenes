package com.sistema_examen_backend.persistence.repository;

import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.persistence.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {

    Set<Question> findByExam(Exam exam);
}
