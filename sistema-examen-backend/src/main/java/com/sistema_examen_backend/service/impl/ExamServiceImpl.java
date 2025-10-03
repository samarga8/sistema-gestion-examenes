package com.sistema_examen_backend.service.impl;

import com.sistema_examen_backend.controller.dto.ExamRequestDTO;
import com.sistema_examen_backend.controller.dto.ExamResponseDTO;
import com.sistema_examen_backend.controller.dto.ExamUpdateRequestDTO;
import com.sistema_examen_backend.persistence.entity.Category;
import com.sistema_examen_backend.persistence.entity.Exam;
import com.sistema_examen_backend.persistence.repository.CategoryRepository;
import com.sistema_examen_backend.persistence.repository.ExamRepository;
import com.sistema_examen_backend.service.interfaces.IExamService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ExamServiceImpl implements IExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private static ModelMapper modelMapper = new ModelMapper();

    @Override
    public Exam createExam(ExamRequestDTO examDTO) {
        if (examDTO.category() == null || examDTO.category().categoryId() == null) {
            throw new IllegalArgumentException("El ID de la categoría no puede ser null");
        }

        Category category = categoryRepository.findById(examDTO.category().categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada"));

        Exam exam = new Exam();
        exam.setActive(examDTO.active());
        exam.setCategory(category);
        exam.setDescription(examDTO.description());
        exam.setTitle(examDTO.title());
        exam.setNumberQuestions(examDTO.numberQuestions());
        exam.setPointMax(examDTO.pointMax());

        return examRepository.save(exam);
    }


    @Override
    public ExamResponseDTO updateExam(ExamUpdateRequestDTO examDTO) {
        Exam exam = examRepository.findById(examDTO.examId())
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        Category category = categoryRepository.findById(examDTO.category().categoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        exam.setTitle(examDTO.title());
        exam.setDescription(examDTO.description());
        exam.setPointMax(examDTO.pointMax());
        exam.setNumberQuestions(examDTO.numberQuestions());
        exam.setActive(examDTO.active());
        exam.setCategory(category);

        examRepository.save(exam);

        return modelMapper.map(exam,ExamResponseDTO.class);
    }


    @Override
    public Set<ExamResponseDTO> getAllExams() {

         return examRepository.findAll().stream().map(exam ->{
             return modelMapper.map(exam,ExamResponseDTO.class);
         }).collect(Collectors.toSet());
    }

    @Override
    public ExamResponseDTO getExam(Long examId) {
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new IllegalArgumentException("El examen no exite"));
        ExamResponseDTO dto = new ExamResponseDTO();
        dto.setTitle(exam.getTitle());
        dto.setExamId(exam.getExamId());
        dto.setPointMax(exam.getPointMax());
        dto.setDescription(exam.getDescription());
        dto.setActive(exam.getActive());
        dto.setNumberQuestions(exam.getNumberQuestions());
        return dto;
    }

    @Override
    public void deleteExam(Long examId) {
        examRepository.deleteById(examId);
    }
}
