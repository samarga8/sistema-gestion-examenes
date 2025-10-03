package com.sistema_examen_backend.persistence.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.beans.Transient;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    private String title;

    private String description;

    @Column(name = "point_max")
    private Integer pointMax;

    @Column(name = "number_questions")
    private Integer numberQuestions;

    private Boolean active = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;


    @OneToMany(mappedBy = "exam",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Question> questions = new HashSet<>();

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "Exam{" +
                "examId=" + examId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", pointMax=" + pointMax +
                ", numberQuestions=" + numberQuestions +
                ", active=" + active +
                ", category=" + category +
                ", questions=" + questions +
                '}';
    }
}
