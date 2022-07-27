package com.renter.domain;

import com.renter.domain.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "vehicle")
public class VehicleEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String transmissionType;
    @Column
    private String registerNumber;
    @Column
    private Integer passengerCount;
    @Column
    private Integer doorCount;
    @Column
    private Integer year;
    @Column
    private Integer cubicSize;
    @Column
    private Double price;
    @Column
    private Double depositPrice;
    @Column
    private Boolean hasDeposit;
    @ManyToOne
    @JoinColumn(name = "vehicle_size_id", nullable = false)
    private VehicleSizeEntity vehicleSize;
    @ManyToOne
    @JoinColumn(name = "fuel_type_id", nullable = false)
    private FuelTypeEntity fuelType;
    @ManyToOne
    @JoinColumn(name = "currency_id", nullable = false)
    private CurrencyEntity currency;

}