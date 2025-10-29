USE expense_tracker;
INSERT INTO expenses (amount, description, date, category_id) VALUES
(250.0, 'Lunch', CURDATE() - INTERVAL 3 DAY, 1),
(1200.0, 'Monthly Rent', CURDATE() - INTERVAL 10 DAY, 2),
(75.5, 'Electricity bill', CURDATE() - INTERVAL 5 DAY, 3);
