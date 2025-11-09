CREATE TABLE IF NOT EXISTS tx_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    tx_type_id BIGINT NOT NULL,
    CONSTRAINT fk_tx_type
        FOREIGN KEY (tx_type_id)
        REFERENCES tx_types(id)
        ON DELETE CASCADE
);