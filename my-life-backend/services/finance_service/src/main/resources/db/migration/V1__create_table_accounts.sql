CREATE TABLE IF NOT EXISTS accounts (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL, -- berasal dari user_db, disimpan apa adanya
    name VARCHAR(128) NOT NULL,
    amount NUMERIC(19, 2) NOT NULL DEFAULT 0,
    description VARCHAR(256),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
