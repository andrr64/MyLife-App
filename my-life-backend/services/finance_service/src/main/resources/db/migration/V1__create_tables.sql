-- 1. Gunakan DECIMAL untuk uang, bukan FLOAT
-- Presisi 19 digit total, 4 digit di belakang koma (aman untuk kripto atau kurs asing)
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    -- 'BANK', 'CASH', etc
    balance DECIMAL(19, 4) DEFAULT 0,
    currency CHAR(3) DEFAULT 'IDR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    -- Nullable for global categories
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('INCOME', 'EXPENSE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    account_id UUID REFERENCES accounts(id),
    category_id BIGINT REFERENCES categories(id),
    -- Kolom Amount bisa positif/negatif tergantung logika aplikasimu, 
    -- atau gunakan absolute value dan bedakan via 'type'.
    amount DECIMAL(19, 4) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('INCOME', 'EXPENSE', 'TRANSFER')),
    transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT,
    -- Untuk fitur Transfer (Linking transaction)
    transfer_pair_id UUID REFERENCES transactions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- INDEXING IS KEY FOR SCALABILITY
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date);
CREATE INDEX idx_transactions_category ON transactions(category_id);