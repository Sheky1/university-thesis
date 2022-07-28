package com.renter.security.roles;

import com.google.common.collect.Sets;

import java.util.Set;
import static com.renter.security.roles.SecurityUserPermission.*;

public enum SecurityUserRole implements SecurityUserRoleInterface{
    ADMIN(Sets.newHashSet(STORE_READ, STORE_WRITE)),
    EMPLOYEE(Sets.newHashSet(PRODUCT_READ, PRODUCT_WRITE, PRODUCT_LIST_READ, PRODUCT_LIST_WRITE));

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
