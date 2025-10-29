package com.example.expensetracker.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.expensetracker.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
}
