package com.example.expensetracker.service;

import com.example.expensetracker.model.Budget;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.BudgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public Optional<Budget> findByUserAndMonth(User user, String month) {
        List<Budget> budgets = budgetRepository.findAllByUserAndMonth(user, month);

        if (budgets.isEmpty()) {
            return Optional.empty();
        }

        // ✅ Clean duplicates
        if (budgets.size() > 1) {
            System.out.println("⚠️ [BudgetService] Found duplicate budgets for " + user.getUsername() + " — cleaning...");
            Budget keep = budgets.get(0);
            budgets.remove(0);
            for (Budget b : budgets) {
                budgetRepository.delete(b);
            }
            return Optional.of(keep);
        }

        return Optional.of(budgets.get(0));
    }

    public Budget save(Budget budget) {
        return budgetRepository.save(budget);
    }
}
