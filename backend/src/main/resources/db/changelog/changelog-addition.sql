-- liquibase formatted sql

-- changeset jlong:create_table_addition
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 select count(*) from information_schema.tables where table_name = 'addition';
CREATE TABLE `addition` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `price` DOUBLE PRECISION NOT NULL,
  `agency_id` INTEGER NOT NULL,
  `currency_id` INTEGER NOT NULL,
  `created_date` DATE NULL DEFAULT NULL,
  `last_modified_date` DATE NULL DEFAULT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  `version` INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT agency_id FOREIGN KEY (agency_id) REFERENCES agency(id),
  CONSTRAINT currency_id FOREIGN KEY (currency_id) REFERENCES currency(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- rollback drop table addition;