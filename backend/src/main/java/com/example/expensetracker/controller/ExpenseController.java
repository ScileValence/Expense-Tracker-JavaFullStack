package com.example.expensetracker.controller;
import org.springframework.web.bind.annotation.*;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.Category;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.repository.CategoryRepository;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;
@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final CategoryRepository categoryRepository;
    public ExpenseController(ExpenseService expenseService, CategoryRepository categoryRepository){
        this.expenseService = expenseService;
        this.categoryRepository = categoryRepository;
    }
    @GetMapping public List<Expense> all(){ return expenseService.all(); }
    @PostMapping public Expense create(@RequestBody ExpenseDTO dto){
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
