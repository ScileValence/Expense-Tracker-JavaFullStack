package com.example.expensetracker.service;

import org.springframework.stereotype.Service;
import com.example.expensetracker.repository.BudgetRepository;
import com.example.expensetracker.model.Budget;
import java.util.Optional;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;
    public BudgetService(BudgetRepository budgetRepository){ this.budgetRepository = budgetRepository; }

    public Optional<Budget> findByMonth(String month){ return budgetRepository.findByMonth(month); }
    public Budget save(Budget b){ return budgetRepository.save(b); }
}
