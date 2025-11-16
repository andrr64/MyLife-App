ALTER TABLE tx_categories
DROP COLUMN tx_type_id;

ALTER TABLE tx_categories
ADD COLUMN effect BOOLEAN NOT NULL;
