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
@Table(name = "addition")
public class AdditionEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private Double price;
    @ManyToOne
    @JoinColumn(name = "agency_id", nullable = false)
    private AgencyEntity agency;
    @ManyToOne
    @JoinColumn(name = "currency_id", nullable = false)
    private CurrencyEntity currency;
    @ManyToMany(mappedBy = "additions")
    private List<VehicleEntity> vehicles;

}
