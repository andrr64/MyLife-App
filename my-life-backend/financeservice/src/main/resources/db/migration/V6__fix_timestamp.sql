-- 1. FIX TABLE ACCOUNTS
-- Tambah kolom updated_at (yang bikin error)
ALTER TABLE accounts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
-- Perbaiki tipe created_at ke Timezone aware
ALTER TABLE accounts ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;


-- 2. FIX TABLE CATEGORIES
-- Tambah kolom updated_at
ALTER TABLE categories ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
-- Perbaiki tipe created_at
ALTER TABLE categories ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;


-- 3. FIX TABLE TRANSACTIONS
-- Tambah kolom updated_at
ALTER TABLE transactions ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
-- Perbaiki tipe created_at
ALTER TABLE transactions ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;
-- Perbaiki tipe transaction_date (PENTING: ini core logic kita tadi)
ALTER TABLE transactions ALTER COLUMN transaction_date TYPE TIMESTAMP WITH TIME ZONE;