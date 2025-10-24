package com.example.expensetracker.config;

import com.example.expensetracker.model.Category;
import com.example.expensetracker.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public DataLoader(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        List<String> defaultCategories = List.of(
                "Food", "Rent", "Utilities", "Entertainment", "Other"
        );

        for (String name : defaultCategories) {
            if (!categoryRepository.existsByName(name)) {
                categoryRepository.save(new Category(name));
            }
        }
    }
}
