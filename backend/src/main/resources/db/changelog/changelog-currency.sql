-- liquibase formatted sql

-- changeset jlong:create_table_currency
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 select count(*) from information_schema.tables where table_name = 'currency';
CREATE TABLE `currency` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `created_date` DATE,
  `last_modified_date` DATE,
  `deleted_at` DATE DEFAULT NULL,
  `version` INTEGER,
  PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- rollback drop table currency;