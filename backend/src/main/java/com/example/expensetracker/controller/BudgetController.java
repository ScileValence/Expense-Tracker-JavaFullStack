package com.example.expensetracker.controller;

import org.springframework.web.bind.annotation.*;
import com.example.expensetracker.model.Budget;
import com.example.expensetracker.service.BudgetService;
import com.example.expensetracker.repository.ExpenseRepository;

import java.time.YearMonth;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {
    private final BudgetService budgetService;
    private final ExpenseRepository expenseRepository;

    public BudgetController(BudgetService budgetService, ExpenseRepository expenseRepository){
        this.budgetService = budgetService;
        this.expenseRepository = expenseRepository;
    }

    // Get current month's budget and spending summary
    @GetMapping
    public Map<String, Object> getCurrentBudget() {
        YearMonth ym = YearMonth.now();
        String monthKey = ym.toString(); // e.g. 2025-10
        Optional<Budget> ob = budgetService.findByMonth(monthKey);
        double limit = ob.map(Budget::getLimitAmount).orElse(0.0);

        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        double spent = expenseRepository.findByDateBetween(start, end).stream()
                .mapToDouble(e -> e.getAmount() == null ? 0.0 : e.getAmount())
                .sum();

        Map<String,Object> m = new HashMap<>();
        m.put("month", monthKey);
        m.put("limit", limit);
        m.put("spent", spent);
        return m;
    }

    @PostMapping
    public Budget setBudget(@RequestBody Budget b){
        YearMonth ym = YearMonth.now();
        b.setMonth(ym.toString());
        return budgetService.save(b);
    }

    @PutMapping
    public Budget updateBudget(@RequestBody Budget b){
        YearMonth ym = YearMonth.now();
        b.setMonth(ym.toString());
        return budgetService.save(b);
    }
}
