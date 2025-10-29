package com.example.expensetracker.service;

import org.springframework.stereotype.Service;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.model.Expense;
import java.util.List;
import java.time.LocalDate;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    public ExpenseService(ExpenseRepository expenseRepository){ this.expenseRepository = expenseRepository; }

    public List<Expense> allForMonth(LocalDate start, LocalDate end){ return expenseRepository.findByDateBetween(start, end); }
    public Expense add(Expense e){ return expenseRepository.save(e); }
    public Expense update(Expense e){ return expenseRepository.save(e); }
    public void delete(Long id){ expenseRepository.deleteById(id); }
}
