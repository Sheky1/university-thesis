package com.renter.security.roles;

import com.google.common.collect.Sets;

import java.util.Set;

import static com.renter.security.roles.SecurityUserPermission.*;

public enum SecurityUserRole implements SecurityUserRoleInterface {
    ADMIN(Sets.newHashSet(AGENCY_READ, AGENCY_WRITE, CITY_READ, CITY_WRITE, CURRENCY_READ, CURRENCY_WRITE, USER_READ, USER_WRITE, VEHICLE_READ, FUEL_TYPE_READ, VEHICLE_SIZE_READ, ADDITION_READ)),
    AGENCY(Sets.newHashSet(VEHICLE_READ, VEHICLE_WRITE, FUEL_TYPE_READ, FUEL_TYPE_WRITE, VEHICLE_SIZE_READ, VEHICLE_SIZE_WRITE, ADDITION_READ, ADDITION_WRITE)),
    CLIENT(Sets.newHashSet(VEHICLE_READ, AGENCY_READ, ADDITION_READ, FUEL_TYPE_READ, VEHICLE_SIZE_READ, CURRENCY_READ, CITY_READ));

    private final Set<SecurityUserPermission> permissions;

    SecurityUserRole(Set<SecurityUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<SecurityUserPermission> getPermissions() {
        return permissions;
    }

    @Override
    public String getName() {
        return this.name();
    }
}
