package com.renter.repositories;

import com.renter.domain.FuelTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FuelTypeRepository extends JpaRepository<FuelTypeEntity, Long> {
    Optional<FuelTypeEntity> findByName(String name);
}
