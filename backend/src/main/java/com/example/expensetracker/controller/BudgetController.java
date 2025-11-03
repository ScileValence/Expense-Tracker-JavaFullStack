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

    // ✅ Helper: extract current user from JWT
    private User getUserFromRequest(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                System.out.println("❌ [BudgetController] Missing or invalid Authorization header");
                return null;
            }

            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);
            User user = userRepository.findByUsername(username).orElse(null);

            if (user == null) {
                System.out.println("❌ [BudgetController] No user found in DB for username: " + username);
            } else {
                System.out.println("✅ [BudgetController] Authenticated user: " + username);
            }

            return user;
        } catch (Exception e) {
            System.err.println("🔥 [BudgetController] Failed to extract user: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // ✅ Get current user's budget for this month
    @GetMapping
    public Map<String, Object> getCurrentBudget(HttpServletRequest request) {
        try {
            User user = getUserFromRequest(request);
            if (user == null) {
                System.out.println("❌ [BudgetController] No valid user found for budget fetch");
                return Map.of("month", "", "limit", 0, "spent", 0);
            }

            YearMonth ym = YearMonth.now();
            String monthKey = ym.toString();
            System.out.println("📅 [BudgetController] Fetching budget for user=" + user.getUsername() + ", month=" + monthKey);

            Optional<Budget> budgetOpt = budgetService.findByUserAndMonth(user, monthKey);
            Budget budget;

            if (budgetOpt.isEmpty()) {
                System.out.println("⚠️ [BudgetController] No budget found, creating default (limit 0.0)");
                Budget newBudget = new Budget();
                newBudget.setUser(user);
                newBudget.setMonth(monthKey);
                newBudget.setLimitAmount(0.0);
                budget = budgetService.save(newBudget);
            } else {
                budget = budgetOpt.get();
            }

            // Calculate monthly spent
            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();
            double spent = expenseRepository.findByDateBetween(start, end).stream()
                    .filter(e -> e.getUser() != null && e.getUser().getId().equals(user.getId()))
                    .mapToDouble(e -> e.getAmount() == null ? 0.0 : e.getAmount())
                    .sum();

            System.out.println("✅ [BudgetController] Budget limit=" + budget.getLimitAmount() + ", spent=" + spent);

            Map<String, Object> response = new HashMap<>();
            response.put("month", monthKey);
            response.put("limit", budget.getLimitAmount());
            response.put("spent", spent);
            return response;

        } catch (Exception e) {
            System.err.println("🔥 [BudgetController] ERROR: " + e.getMessage());
            e.printStackTrace();
            return Map.of("month", "error", "limit", 0, "spent", 0);
        }
    }

    // ✅ Create or update monthly budget (ensures persistence)
    @PostMapping
    public Budget setOrUpdateBudget(@RequestBody Budget b, HttpServletRequest request) {
        try {
            User user = getUserFromRequest(request);
            if (user == null) {
                System.out.println("❌ [BudgetController] Cannot save budget — no user found");
                return null;
            }

            YearMonth ym = YearMonth.now();
            String monthKey = ym.toString();

            Optional<Budget> existing = budgetService.findByUserAndMonth(user, monthKey);
            Budget saved;

            if (existing.isPresent()) {
                Budget existingBudget = existing.get();
                existingBudget.setLimitAmount(b.getLimitAmount());
                saved = budgetService.save(existingBudget);
                System.out.println("🟢 [BudgetController] Updated existing budget for user=" + user.getUsername()
                        + ", month=" + monthKey + ", new limit=" + b.getLimitAmount());
            } else {
                b.setUser(user);
                b.setMonth(monthKey);
                saved = budgetService.save(b);
                System.out.println("🟢 [BudgetController] Added new budget for user=" + user.getUsername()
                        + ", month=" + monthKey + ", limit=" + b.getLimitAmount());
            }

            return saved;

        } catch (Exception e) {
            System.err.println("🔥 [BudgetController] Failed to save/update budget: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // ✅ Update budget (PUT alias)
    @PutMapping
    public Budget updateBudget(@RequestBody Budget b, HttpServletRequest request) {
        return setOrUpdateBudget(b, request);
    }
}
