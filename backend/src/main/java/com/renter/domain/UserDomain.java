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
@Table(name = "user_domain")
public class UserDomain extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private String surname;
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private RoleEntity role;
    @OneToOne
    @JoinColumn(name = "agency_id", referencedColumnName = "id")
    private AgencyEntity agency;

}
