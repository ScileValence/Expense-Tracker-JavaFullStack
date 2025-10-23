package com.example.expensetracker.controller;
import org.springframework.web.bind.annotation.*;
import com.example.expensetracker.model.Category;
import com.example.expensetracker.service.CategoryService;
import java.util.List;
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService){ this.categoryService = categoryService; }
    @GetMapping public List<Category> getAll(){ return categoryService.all(); }
    @PostMapping public Category create(@RequestBody Category c){ return categoryService.add(c); }
}
