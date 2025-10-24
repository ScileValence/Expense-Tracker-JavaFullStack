package com.example.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.expensetracker.model.Budget;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByMonth(String month);
}
