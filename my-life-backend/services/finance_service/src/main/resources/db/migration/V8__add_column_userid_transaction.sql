ALTER TABLE transactions
    ADD COLUMN account_id BIGINT NOT NULL,
    ADD CONSTRAINT fk_account_id
        FOREIGN KEY (account_id)
        REFERENCES accounts(id)
        ON DELETE CASCADE;
