CREATE TABLE IF NOT EXISTS tx_types (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    effect BOOLEAN NOT NULL -- true = tambah saldo, false = kurangi saldo
);