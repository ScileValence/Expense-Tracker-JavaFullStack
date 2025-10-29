package com.example.expensetracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String month; // e.g. 2025-10

    private Double limitAmount;

    public Budget(){}

    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getMonth(){ return month; }
    public void setMonth(String month){ this.month = month; }

    public Double getLimitAmount(){ return limitAmount; }
    public void setLimitAmount(Double limitAmount){ this.limitAmount = limitAmount; }
}
