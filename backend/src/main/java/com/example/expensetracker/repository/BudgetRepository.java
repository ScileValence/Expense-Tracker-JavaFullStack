package com.example.expensetracker.repository;

import com.example.expensetracker.model.Budget;
import com.example.expensetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    // ✅ Return all budgets matching user and month
    List<Budget> findAllByUserAndMonth(User user, String month);

    // ✅ Optional: delete duplicates for cleanup
    @Query("DELETE FROM Budget b WHERE b.user = :user AND b.month = :month AND b.id NOT IN (" +
           "SELECT MIN(b2.id) FROM Budget b2 WHERE b2.user = :user AND b2.month = :month)")
    void deleteDuplicateBudgets(User user, String month);
}
