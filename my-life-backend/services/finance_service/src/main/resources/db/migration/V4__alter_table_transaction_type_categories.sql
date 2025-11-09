-- Ubah tipe data kolom tx_type_id jadi BIGINT
ALTER TABLE tx_categories 
ALTER COLUMN tx_type_id TYPE BIGINT;

-- Tambah kolom user_id di tx_categories
ALTER TABLE tx_categories 
ADD COLUMN user_id UUID NOT NULL;

-- Tambah kolom user_id di tx_types
ALTER TABLE tx_types 
ADD COLUMN user_id UUID NOT NULL;
