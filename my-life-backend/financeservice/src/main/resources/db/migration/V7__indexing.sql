-- indexing database for better performance

CREATE INDEX idx_accounts_user_name
ON accounts (user_id, name);

CREATE INDEX idx_categories_user_type
ON categories (user_id, type);

CREATE INDEX idx_categories_user_null
ON categories (user_id)
WHERE user_id IS NULL;

CREATE INDEX idx_transactions_account_date
ON transactions (account_id, transaction_date DESC);

CREATE INDEX idx_transactions_user_type
ON transactions (user_id, type);
