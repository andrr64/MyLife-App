CREATE TABLE IF NOT EXISTS global_tx_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    tx_type_id BIGINT NOT NULL,
    -- PERBAIKAN DISINI: Ganti 'tx_types' menjadi 'global_tx_type'
    CONSTRAINT fk_tx_type FOREIGN KEY (tx_type_id) REFERENCES global_tx_type(id) ON DELETE CASCADE
);
-- Masukkan Kategori Income
INSERT INTO global_tx_categories (name, tx_type_id)
SELECT target_categories.category_name,
    type_source.id
FROM global_tx_type type_source
    CROSS JOIN (
        VALUES ('Salary'),
            ('Initial Balance'),
            ('Bonus'),
            ('Allowance'),
            ('Investment Return')
    ) AS target_categories(category_name)
WHERE type_source.name = 'Income' ON CONFLICT (name) DO NOTHING;