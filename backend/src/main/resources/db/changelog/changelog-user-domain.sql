-- liquibase formatted sql

-- changeset jlong:create_table_user_domain
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 select count(*) from information_schema.tables where table_name = 'user_domain';
CREATE TABLE `user_domain` (
  `id` INTEGER NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_date` DATE,
  `last_modified_date` DATE,
  `deleted_at` DATE DEFAULT NULL,
  `version` INTEGER,
  PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- rollback drop table user_domain;