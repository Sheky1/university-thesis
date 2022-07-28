package com.renter.repositories;

import com.renter.domain.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDomainRepository extends JpaRepository<UserDomain, Long> {
    Optional<UserDomain> findByUsername(String username);
}
