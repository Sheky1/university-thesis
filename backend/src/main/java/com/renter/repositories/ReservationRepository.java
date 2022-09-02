package com.renter.repositories;

import com.renter.domain.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    List<ReservationEntity> findReservationEntitiesByAgency_Id(Long agencyId);
    List<ReservationEntity> findReservationEntitiesByVehicle_Id(Long vehicleId);
}
