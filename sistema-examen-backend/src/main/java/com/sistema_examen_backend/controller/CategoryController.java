package com.sistema_examen_backend.controller;

import com.sistema_examen_backend.controller.dto.CategoryRequestDTO;
import com.sistema_examen_backend.controller.dto.CategoryResponse;
import com.sistema_examen_backend.persistence.entity.Category;
import com.sistema_examen_backend.service.interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private ICategoryService service;

    @PostMapping("/save")
    public ResponseEntity<?> saveCategory(@RequestBody CategoryRequestDTO category){
         service.saveCategory(category);
        return new ResponseEntity<>("Categoria creada correctamente", HttpStatus.CREATED);
    }

    @GetMapping("/get/{categoryId}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long categoryId){
        CategoryResponse response = service.getCategory(categoryId);
        if (response == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(service.getCategory(categoryId),HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll(){
        Set<CategoryResponse> categories = service.getAllCategories();
        if (categories.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryRequestDTO categoryDTO, @RequestParam long id){
        Category category = service.updateCategory(categoryDTO,id);
        if (category == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Categoria actualizada",HttpStatus.OK);
    }

    @DeleteMapping("/delete/categoryId")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId){
        service.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

