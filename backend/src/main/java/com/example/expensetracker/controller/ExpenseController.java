package com.example.expensetracker.controller;

import org.springframework.web.bind.annotation.*;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.Category;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.ExpenseRepository;

import java.util.List;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseService expenseService, CategoryRepository categoryRepository, ExpenseRepository expenseRepository){
        this.expenseService = expenseService;
        this.categoryRepository = categoryRepository;
        this.expenseRepository = expenseRepository;
    }

    // Returns expenses for current month
    @GetMapping
    public List<Expense> allForCurrentMonth() {
        YearMonth ym = YearMonth.now();
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        return expenseService.allForMonth(start, end);
    }

    @PostMapping
    public Expense create(@RequestBody ExpenseDTO dto){
        Expense e = new Expense();
        e.setAmount(dto.getAmount());
        e.setDescription(dto.getDescription());
        e.setDate(dto.getDate() == null ? LocalDate.now() : dto.getDate());
        if(dto.getCategoryId() != null){
            Optional<Category> c = categoryRepository.findById(dto.getCategoryId());
            c.ifPresent(e::setCategory);
        }
        return expenseService.add(e);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody ExpenseDTO dto){
        Optional<Expense> oe = expenseRepository.findById(id);
        if(oe.isEmpty()) return null;
        Expense e = oe.get();
        e.setAmount(dto.getAmount());
        e.setDescription(dto.getDescription());
        e.setDate(dto.getDate() == null ? e.getDate() : dto.getDate());
        if(dto.getCategoryId() != null){
            categoryRepository.findById(dto.getCategoryId()).ifPresent(e::setCategory);
        } else {
            e.setCategory(null);
        }
        return expenseService.update(e);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        expenseService.delete(id);
    }

    public static class ExpenseDTO {
        private Double amount;
        private String description;
        private java.time.LocalDate date;
        private Long categoryId;
        public Double getAmount(){ return amount; }
        public void setAmount(Double amount){ this.amount = amount; }
        public String getDescription(){ return description; }
        public void setDescription(String description){ this.description = description; }
        public java.time.LocalDate getDate(){ return date; }
        public void setDate(java.time.LocalDate date){ this.date = date; }
        public Long getCategoryId(){ return categoryId; }
        public void setCategoryId(Long categoryId){ this.categoryId = categoryId; }
    }
}
