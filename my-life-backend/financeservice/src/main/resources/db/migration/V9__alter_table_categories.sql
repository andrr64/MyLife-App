ALTER TABLE categories
ADD COLUMN type_id SMALLINT;

UPDATE categories
SET type_id = CASE
    WHEN type = 'EXPENSE' then 0
    WHEN type = 'INCOME' then 1
    WHEN TYPE = 'TRANSFER' then 2
    ELSE NULL
END;