package com.sistema_examen_backend.persistence.repository;

import com.sistema_examen_backend.persistence.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam,Long> {
}
