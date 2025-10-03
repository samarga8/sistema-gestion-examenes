package com.sistema_examen_backend.service.interfaces;

import com.sistema_examen_backend.controller.dto.ExamRequestDTO;
import com.sistema_examen_backend.controller.dto.ExamResponseDTO;
import com.sistema_examen_backend.controller.dto.ExamUpdateRequestDTO;
import com.sistema_examen_backend.persistence.entity.Exam;

import java.util.Set;

public interface IExamService {

    Exam createExam(ExamRequestDTO exam);

    ExamResponseDTO updateExam(ExamUpdateRequestDTO exam);

    Set<ExamResponseDTO> getAllExams();

    ExamResponseDTO getExam(Long examId);

    void deleteExam(Long examId);
}
