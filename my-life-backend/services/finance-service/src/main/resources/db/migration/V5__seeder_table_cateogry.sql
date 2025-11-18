ALTER TABLE categories
ALTER COLUMN user_id DROP NOT NULL;

INSERT INTO categories (user_id, name, type) VALUES
-- --- INCOME CATEGORIES ---
(NULL, 'Salary', 'INCOME'),
(NULL, 'Bonus', 'INCOME'),
(NULL, 'Freelance', 'INCOME'),
(NULL, 'Interest', 'INCOME'), -- Bunga tabungan
(NULL, 'Investment', 'INCOME'), -- Penjualan saham/crypto
(NULL, 'Gifts', 'INCOME'),
(NULL, 'Other Income', 'INCOME'),

-- --- EXPENSE CATEGORIES ---

-- Food & Dining
(NULL, 'Groceries', 'EXPENSE'),
(NULL, 'Food & Drinks', 'EXPENSE'), -- Restoran, Kopi
(NULL, 'Snacks', 'EXPENSE'),

-- Transportation
(NULL, 'Fuel', 'EXPENSE'),
(NULL, 'Parking', 'EXPENSE'),
(NULL, 'Public Transport', 'EXPENSE'),
(NULL, 'Ride Hailing', 'EXPENSE'), -- Gojek/Grab
(NULL, 'Vehicle Maintenance', 'EXPENSE'),

-- Housing & Bills
(NULL, 'Rent/Mortgage', 'EXPENSE'),
(NULL, 'Electricity', 'EXPENSE'),
(NULL, 'Water', 'EXPENSE'),
(NULL, 'Internet', 'EXPENSE'),
(NULL, 'Phone Bill', 'EXPENSE'),
(NULL, 'Gas', 'EXPENSE'), -- Gas (LPG/PNG)

-- Personal & Shopping
(NULL, 'Clothing', 'EXPENSE'),
(NULL, 'Personal Care', 'EXPENSE'), -- Skincare, sabun
(NULL, 'Household', 'EXPENSE'), -- Tisu, pembersih
(NULL, 'Electronics', 'EXPENSE'),
(NULL, 'Subscriptions', 'EXPENSE'), -- Netflix, Spotify

-- Health & Fitness
(NULL, 'Doctor/Hospital', 'EXPENSE'),
(NULL, 'Medication', 'EXPENSE'),
(NULL, 'Health Insurance', 'EXPENSE'),
(NULL, 'Gym/Fitness', 'EXPENSE'),

-- Entertainment & Others
(NULL, 'Entertainment', 'EXPENSE'), -- Bioskop, konser
(NULL, 'Hobbies', 'EXPENSE'),
(NULL, 'Education', 'EXPENSE'),
(NULL, 'Gifts/Donations', 'EXPENSE'),
(NULL, 'Bank Fees', 'EXPENSE'),
(NULL, 'Other Expense', 'EXPENSE');