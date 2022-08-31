package com.renter.domain;

import com.renter.domain.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "reservations")
public class ReservationEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String phoneNumber;
    @Column
    private Boolean approved;
    @Column
    private Boolean completed;
    @Column
    private Boolean rejected;
    @Column
    private LocalDate reservationDate;
    @Column
    private LocalDate takingDate;
    @Column
    private LocalDate returningDate;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDomain user;
    @ManyToOne
    @JoinColumn(name = "agency_id", nullable = false)
    private AgencyEntity agency;
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private VehicleEntity vehicle;
}
