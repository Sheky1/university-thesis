-- liquibase formatted sql

-- changeset jlong:create_table_reservations
-- preconditions onFail:MARK_RAN onError:MARK_RAN
-- precondition-sql-check expectedResult:0 select count(*) from information_schema.tables where table_name = 'reservations';
CREATE TABLE `reservations` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  `is_rejected` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` INTEGER NOT NULL,
  `agency_id` INTEGER NOT NULL,
  `vehicle_id` INTEGER NOT NULL,
  `reservation_date` DATE DEFAULT NULL,
  `taking_date` DATE DEFAULT NULL,
  `returning_date` DATE DEFAULT NULL,
  `created_date` DATE,
  `last_modified_date` DATE,
  `deleted_at` DATE DEFAULT NULL,
  `version` INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT agency_id FOREIGN KEY (agency_id) REFERENCES agency(id),
  CONSTRAINT id FOREIGN KEY (id) REFERENCES user_domain(id),
  CONSTRAINT vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- rollback drop table reservations;