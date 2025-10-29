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

    // ✅ Get current user's budget for this month (with detailed debug)
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

            // Fetch or create new budget
            Budget budget = budgetService.findByUserAndMonth(user, monthKey)
                    .orElseGet(() -> {
                        System.out.println("⚠️ [BudgetController] No budget found, creating new default (0.0)");
                        Budget newB = new Budget();
                        newB.setUser(user);
                        newB.setMonth(monthKey);
                        newB.setLimitAmount(0.0);
                        return budgetService.save(newB);
                    });

            // Calculate total spent for this month
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

    // ✅ Create a new budget
    @PostMapping
    public Budget setBudget(@RequestBody Budget b, HttpServletRequest request) {
        try {
            User user = getUserFromRequest(request);
            if (user == null) {
                System.out.println("❌ [BudgetController] Cannot set budget — no user found");
                return null;
            }

            YearMonth ym = YearMonth.now();
            b.setMonth(ym.toString());
            b.setUser(user);
            Budget saved = budgetService.save(b);
            System.out.println("✅ [BudgetController] Budget saved for user=" + user.getUsername() + ", limit=" + b.getLimitAmount());
            return saved;

        } catch (Exception e) {
            System.err.println("🔥 [BudgetController] Failed to set budget: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    // ✅ Update user's monthly budget
    @PutMapping
    public Budget updateBudget(@RequestBody Budget b, HttpServletRequest request) {
        try {
            User user = getUserFromRequest(request);
            if (user == null) {
                System.out.println("❌ [BudgetController] Cannot update budget — no user found");
                return null;
            }

            YearMonth ym = YearMonth.now();
            b.setMonth(ym.toString());
            b.setUser(user);
            Budget updated = budgetService.save(b);
            System.out.println("✅ [BudgetController] Budget updated for user=" + user.getUsername() + ", limit=" + b.getLimitAmount());
            return updated;

        } catch (Exception e) {
            System.err.println("🔥 [BudgetController] Failed to update budget: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
