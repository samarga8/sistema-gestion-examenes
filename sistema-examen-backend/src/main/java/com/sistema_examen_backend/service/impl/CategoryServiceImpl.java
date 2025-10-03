package com.sistema_examen_backend.service.impl;

import com.sistema_examen_backend.controller.dto.CategoryRequestDTO;
import com.sistema_examen_backend.controller.dto.CategoryResponse;
import com.sistema_examen_backend.persistence.entity.Category;
import com.sistema_examen_backend.persistence.repository.CategoryRepository;
import com.sistema_examen_backend.service.interfaces.ICategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    private static ModelMapper modelMapper = new ModelMapper();



    @Override
    public void saveCategory(CategoryRequestDTO categoryDTO) {

        Category response = modelMapper.map(categoryDTO,Category.class);
        categoryRepository.save(response);
    }

    @Override
    public Category updateCategory(CategoryRequestDTO categoryDTO,long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()){
            category.get().setId(id);
            category.get().setTitle(categoryDTO.getTitle());
            category.get().setDescription(categoryDTO.getDescription());

            return categoryRepository.save(category.get());
        }
        return null;
    }

    @Override
    public Set<CategoryResponse> getAllCategories() {

        Set<CategoryResponse> response = categoryRepository.findAll().stream().map(c -> {
            return modelMapper.map(c,CategoryResponse.class);
        }).collect(Collectors.toSet());
        return response;
    }

    @Override
    public CategoryResponse getCategory(Long categoryId) {

        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()){
            CategoryResponse response = modelMapper.map(category.get(),CategoryResponse.class);
            return response;
        }
        return null;
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
