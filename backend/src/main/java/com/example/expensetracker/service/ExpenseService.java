package com.example.expensetracker.service;
import org.springframework.stereotype.Service;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.model.Expense;
import java.util.List;
@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    public ExpenseService(ExpenseRepository expenseRepository){ this.expenseRepository = expenseRepository; }
    public List<Expense> all(){ return expenseRepository.findAll(); }
    public Expense add(Expense e){ return expenseRepository.save(e); }
    public List<Expense> byCategory(Long categoryId){ return expenseRepository.findByCategoryId(categoryId); }
}
