package com.renter.repositories;

import com.renter.domain.AgencyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgencyRepository extends JpaRepository<AgencyEntity, Long> {
}
