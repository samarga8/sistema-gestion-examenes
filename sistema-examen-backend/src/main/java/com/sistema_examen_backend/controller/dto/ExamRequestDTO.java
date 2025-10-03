package com.sistema_examen_backend.controller.dto;

public record ExamRequestDTO(
        String title,
        String description,
        Integer pointMax,
        Integer numberQuestions,
        Boolean active,
        CategoryDTO category
) {}




