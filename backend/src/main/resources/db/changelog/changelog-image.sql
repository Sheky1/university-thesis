-- liquibase formatted sql

-- changeset jlong:create_table_image
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 select count(*) from information_schema.tables where table_name = 'image';
CREATE TABLE `image` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255),
  `vehicle_id` INTEGER NOT NULL,
  `created_date` DATE,
  `last_modified_date` DATE,
  `deleted_at` DATE DEFAULT NULL,
  `version` INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- rollback drop table image;