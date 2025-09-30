package com.sistema_examen_backend.service.interfaces;

import com.sistema_examen_backend.controller.dto.CategoryRequestDTO;
import com.sistema_examen_backend.controller.dto.CategoryResponse;
import com.sistema_examen_backend.persistence.entity.Category;

import java.util.Set;

public interface ICategoryService {

    void saveCategory(CategoryRequestDTO category);

    Category updateCategory(CategoryRequestDTO category, long id);

    Set<CategoryResponse> getAllCategories();

    CategoryResponse getCategory(Long categoryId);

    void deleteCategory(Long categoryId);
}
