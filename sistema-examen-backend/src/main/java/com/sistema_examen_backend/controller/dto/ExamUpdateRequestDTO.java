package com.sistema_examen_backend.controller.dto;

public record ExamUpdateRequestDTO(Long examId, String title,
                                   String description,
                                   Integer pointMax,
                                   Integer numberQuestions,
                                   Boolean active,
                                   CategoryDTO category) {

}
