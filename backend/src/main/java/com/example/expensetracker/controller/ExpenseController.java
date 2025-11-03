package com.example.expensetracker.controller;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public ExpenseController(
            ExpenseService expenseService,
            CategoryRepository categoryRepository,
            ExpenseRepository expenseRepository,
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.expenseService = expenseService;
        this.categoryRepository = categoryRepository;
        this.expenseRepository = expenseRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    private User getUserFromRequest(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return null;
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        return userRepository.findByUsername(username).orElse(null);
    }

    // ✅ Get all expenses for a specific month (or current if not provided)
    @GetMapping
    public List<Expense> getExpenses(
            @RequestParam(required = false) String month,
            HttpServletRequest request
    ) {
        User user = getUserFromRequest(request);
        if (user == null) return List.of();

        YearMonth ym;
        try {
            ym = (month != null && !month.isBlank()) ? YearMonth.parse(month) : YearMonth.now();
        } catch (Exception e) {
            ym = YearMonth.now();
        }

        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        return expenseService.allForMonth(user, start, end);
    }

    @PostMapping
    public Expense create(@RequestBody ExpenseDTO dto, HttpServletRequest request) {
        User user = getUserFromRequest(request);
        if (user == null) return null;

        Expense e = new Expense();
        e.setAmount(dto.getAmount());
        e.setDescription(dto.getDescription());
        e.setDate(dto.getDate() == null ? LocalDate.now() : dto.getDate());
        e.setUser(user);

        if (dto.getCategoryId() != null) {
            categoryRepository.findById(dto.getCategoryId()).ifPresent(e::setCategory);
        }

        return expenseService.add(e);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody ExpenseDTO dto, HttpServletRequest request) {
        User user = getUserFromRequest(request);
        if (user == null) return null;

        Optional<Expense> oe = expenseRepository.findById(id);
        if (oe.isEmpty()) return null;

        Expense e = oe.get();
        if (!e.getUser().getId().equals(user.getId())) return null; // security

        e.setAmount(dto.getAmount());
        e.setDescription(dto.getDescription());
        e.setDate(dto.getDate() == null ? e.getDate() : dto.getDate());

        if (dto.getCategoryId() != null) {
            categoryRepository.findById(dto.getCategoryId()).ifPresent(e::setCategory);
        } else {
            e.setCategory(null);
        }

        return expenseService.update(e);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        User user = getUserFromRequest(request);
        if (user == null) return;

        Optional<Expense> oe = expenseRepository.findById(id);
        if (oe.isPresent() && oe.get().getUser().getId().equals(user.getId())) {
            expenseService.delete(id);
        }
    }

    // ✅ DTO class
    public static class ExpenseDTO {
        private Double amount;
        private String description;
        private LocalDate date;
        private Long categoryId;

        public Double getAmount() { return amount; }
        public void setAmount(Double amount) { this.amount = amount; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public LocalDate getDate() { return date; }
        public void setDate(LocalDate date) { this.date = date; }

        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    }
}
