package com.renter.repositories;

import com.renter.domain.AdditionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdditionRepository extends JpaRepository<AdditionEntity, Long> {
}
