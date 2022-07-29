package com.renter.domain;

import com.renter.domain.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "agency")
public class AgencyEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String address;
    @Column
    private String logoUrl;
    @ManyToOne
    @JoinColumn(name="city_id", nullable=false)
    private CityEntity city;
    @OneToMany(mappedBy = "agency")
    private List<AdditionEntity> additions;
    @OneToMany(mappedBy = "agency")
    private List<FuelTypeEntity> fuelTypes;
    @OneToMany(mappedBy = "agency")
    private List<VehicleSizeEntity> vehicleSizes;
    @OneToOne(mappedBy = "agency")
    private UserDomain user;

}
