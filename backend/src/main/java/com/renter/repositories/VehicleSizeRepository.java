package com.renter.repositories;

import com.renter.domain.VehicleSizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleSizeRepository extends JpaRepository<VehicleSizeEntity, Long> {
}
