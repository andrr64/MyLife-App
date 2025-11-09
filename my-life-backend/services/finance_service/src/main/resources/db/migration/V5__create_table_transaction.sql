CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY,
    title VARCHAR(128),
    description VARCHAR(255),
    amount NUMERIC(19, 2) NOT NULL,
    tx_category_id BIGINT NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tx_category
        FOREIGN KEY (tx_category_id)
        REFERENCES tx_categories(id)
        ON DELETE CASCADE
);
