ALTER TABLE transactions
ADD COLUMN type_id SMALLINT;

UPDATE transactions
SET type_id = CASE
    WHEN type = 'EXPENSE' then 0
    WHEN type = 'INCOME' then 1
    WHEN TYPE = 'TRANSFER' then 2
    ELSE NULL
END;