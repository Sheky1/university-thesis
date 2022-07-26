package com.renter.repositories;

import com.renter.domain.VehicleSizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleSizeRepository extends JpaRepository<VehicleSizeEntity, Long> {
    Optional<VehicleSizeEntity> findByName(String name);
}
