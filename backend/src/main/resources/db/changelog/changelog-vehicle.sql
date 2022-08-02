-- liquibase formatted sql

-- changeset jlong:create_table_vehicle
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 select count(*) from information_schema.tables where table_name = 'vehicle';
CREATE TABLE `vehicle` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `transmission_type` VARCHAR(255) NOT NULL,
  `passenger_count` INTEGER NOT NULL,
  `door_count` INTEGER NOT NULL,
  `has_deposit` BOOLEAN NOT NULL,
  `deposit_price` DOUBLE PRECISION NOT NULL,
  `year` INTEGER NOT NULL,
  `register_number` VARCHAR(255) NOT NULL,
  `price` DOUBLE PRECISION NOT NULL,
  `cubic_size` INTEGER NOT NULL,
  `vehicle_size_id` INTEGER NOT NULL,
  `fuel_type_id` INTEGER NOT NULL,
  `currency_id` INTEGER NOT NULL,
  `agency_id` INTEGER NOT NULL,
  `created_date` DATE,
  `last_modified_date` DATE,
  `deleted_at` DATE DEFAULT NULL,
  `version` INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT vehicle_size_id FOREIGN KEY (vehicle_size_id) REFERENCES vehicle_size(id),
  CONSTRAINT fuel_type_id FOREIGN KEY (fuel_type_id) REFERENCES fuel_type(id),
  CONSTRAINT currency_id FOREIGN KEY (currency_id) REFERENCES currency(id),
  CONSTRAINT agency_id FOREIGN KEY (agency_id) REFERENCES agency(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- rollback drop table vehicle;