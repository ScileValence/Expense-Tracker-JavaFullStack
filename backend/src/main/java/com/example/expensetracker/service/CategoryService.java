package com.example.expensetracker.service;
import org.springframework.stereotype.Service;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.model.Category;
import java.util.List;
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository){ this.categoryRepository = categoryRepository; }
    public List<Category> all(){ return categoryRepository.findAll(); }
    public Category add(Category c){ return categoryRepository.save(c); }
}
