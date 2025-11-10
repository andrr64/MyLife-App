CREATE TABLE IF NOT EXISTS global_tx_type (
    id bigserial primary key,
    name varchar(64) unique not null,
    effect boolean not null
);