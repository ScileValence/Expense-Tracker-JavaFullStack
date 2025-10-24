package com.example.expensetracker.controller;

import org.springframework.web.bind.annotation.*;
import com.example.expensetracker.model.Category;
import com.example.expensetracker.repository.CategoryRepository;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    public CategoryController(CategoryRepository categoryRepository){ this.categoryRepository = categoryRepository; }

    @GetMapping public List<Category> all(){ return categoryRepository.findAll(); }
    @PostMapping public Category create(@RequestBody Category c){ return categoryRepository.save(c); }
}
