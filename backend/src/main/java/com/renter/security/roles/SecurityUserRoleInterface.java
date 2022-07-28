package com.renter.security.roles;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

public interface SecurityUserRoleInterface {
    Set<SecurityUserPermission> getPermissions();
    String getName();

    default Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + getName()));
        return permissions;
    }
}
