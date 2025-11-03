package com.example.expensetracker.controller;

import org.springframework.web.bind.annotation.*;
import com.example.expensetracker.model.Budget;
import com.example.expensetracker.model.User;
import com.example.expensetracker.service.BudgetService;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.service.JwtService;

import java.time.YearMonth;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetService budgetService;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public BudgetController(
            BudgetService budgetService,
            ExpenseRepository expenseRepository,
            UserRepository userRepository,
            JwtService jwtService
    ) {
        this.budgetService = budgetService;
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // ✅ Extract user from JWT
    private User getUserFromRequest(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) return null;
            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);
            return userRepository.findByUsername(username).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // ✅ Get or create a specific month’s budget for the user
    @GetMapping
    public Map<String, Object> getBudgetForMonth(
            @RequestParam(required = false) String month,
            HttpServletRequest request
    ) {
        User user = getUserFromRequest(request);
        if (user == null) return Map.of("month", "", "limit", 0, "spent", 0);

        YearMonth ym;
        try {
            ym = (month != null && !month.isBlank()) ? YearMonth.parse(month) : YearMonth.now();
        } catch (Exception e) {
            ym = YearMonth.now();
        }

        String monthKey = ym.toString();

        // ✅ Find or create month-specific budget
        Optional<Budget> budgetOpt = budgetService.findByUserAndMonth(user, monthKey);
        Budget budget = budgetOpt.orElseGet(() -> {
            Budget b = new Budget();
            b.setUser(user);
            b.setMonth(monthKey);
            b.setLimitAmount(0.0);
            return budgetService.save(b);
        });

        // ✅ Calculate spending for the same month
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        double spent = expenseRepository.findByUserAndDateBetween(user, start, end)
                .stream()
                .mapToDouble(e -> e.getAmount() == null ? 0.0 : e.getAmount())
                .sum();

        Map<String, Object> response = new HashMap<>();
        response.put("month", monthKey);
        response.put("limit", budget.getLimitAmount());
        response.put("spent", spent);
        return response;
    }

    // ✅ Save or update budget — only for selected month
    @PostMapping
    public Budget createOrUpdateBudget(
            @RequestBody Map<String, Object> payload,
            HttpServletRequest request
    ) {
        User user = getUserFromRequest(request);
        if (user == null) return null;

        // 🧠 Get month from payload or default to current month
        String month = (String) payload.getOrDefault("month", YearMonth.now().toString());
        double limitAmount = Double.parseDouble(payload.getOrDefault("limitAmount", 0).toString());

        // ✅ Check if this specific user + month combo exists
        Optional<Budget> existing = budgetService.findByUserAndMonth(user, month);
        Budget saved;

        if (existing.isPresent()) {
            // Update only that month’s record
            Budget b = existing.get();
            b.setLimitAmount(limitAmount);
            saved = budgetService.save(b);
        } else {
            // Create new month entry for this user
            Budget b = new Budget();
            b.setUser(user);
            b.setMonth(month);
            b.setLimitAmount(limitAmount);
            saved = budgetService.save(b);
        }

        return saved;
    }

    // ✅ PUT behaves same as POST
    @PutMapping
    public Budget updateBudget(
            @RequestBody Map<String, Object> payload,
            HttpServletRequest request
    ) {
        return createOrUpdateBudget(payload, request);
    }
}
