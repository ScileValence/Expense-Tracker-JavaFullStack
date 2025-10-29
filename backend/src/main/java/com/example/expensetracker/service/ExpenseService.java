package com.example.expensetracker.service;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // ✅ Fetch expenses for a specific user and month range
    public List<Expense> allForMonth(User user, LocalDate start, LocalDate end) {
        return expenseRepository.findByUserAndDateBetween(user, start, end);
    }

    // ✅ Add expense linked to a specific user
    public Expense add(Expense expense) {
        return expenseRepository.save(expense);
    }

    // ✅ Update an existing expense
    public Expense update(Expense expense) {
        return expenseRepository.save(expense);
    }

    // ✅ Delete an expense by ID
    public void delete(Long id) {
        expenseRepository.deleteById(id);
    }
}
