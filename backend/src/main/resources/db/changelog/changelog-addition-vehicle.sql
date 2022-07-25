-- liquibase formatted sql

-- changeset jlong:create_table_addition_vehicle
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 select count(*) from information_schema.tables where table_name = 'addition_vehicle';
CREATE TABLE `addition_vehicle` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `addition_id` bigint UNSIGNED NOT NULL,
  `vehicle_id` bigint UNSIGNED NOT NULL,
  `created_date` DATE NULL DEFAULT NULL,
  `last_modified_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT addition_id FOREIGN KEY (addition_id) REFERENCES addition(id),
  CONSTRAINT vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- rollback drop table addition_vehicle;