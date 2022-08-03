package com.renter.domain;

import com.renter.domain.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;

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
    @ManyToOne
    @JoinColumn(name = "agency_id", nullable = false)
    private AgencyEntity agency;
    @ManyToMany
    @JoinTable(
            name = "addition_vehicle",
            joinColumns = @JoinColumn(name = "vehicle_id"),
            inverseJoinColumns = @JoinColumn(name = "addition_id"))
    List<AdditionEntity> additions;
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<ImageEntity> images;

}