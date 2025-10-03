package com.sistema_examen_backend.controller.dto;

public class ExamResponseDTO {
    private Long examId;
    private String title;
    private String description;
    private Integer pointMax;
    private Integer numberQuestions;
    private Boolean active;

    public ExamResponseDTO() {
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPointMax() {
        return pointMax;
    }

    public void setPointMax(Integer pointMax) {
        this.pointMax = pointMax;
    }

    public Integer getNumberQuestions() {
        return numberQuestions;
    }

    public void setNumberQuestions(Integer numberQuestions) {
        this.numberQuestions = numberQuestions;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
