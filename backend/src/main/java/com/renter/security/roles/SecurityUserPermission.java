package com.renter.security.roles;

public enum SecurityUserPermission {
    VEHICLE_READ("store:read"),
    VEHICLE_WRITE("store:write"),
    CITY_READ("city:read"),
    CITY_WRITE("city:write"),
    AGENCY_READ("agency:read"),
    AGENCY_WRITE("agency:write"),
    CURRENCY_READ("currency:read"),
    CURRENCY_WRITE("currency:write"),
    FUEL_TYPE_READ("fuel-type:read"),
    FUEL_TYPE_WRITE("fuel-type:write"),
    USER_READ("user:read"),
    USER_WRITE("user:write"),
    VEHICLE_SIZE_READ("vehicle-size:read"),
    VEHICLE_SIZE_WRITE("vehicle-size:write"),
    ADDITION_READ("addition:read"),
    ADDITION_WRITE("addition:write");


    private final String permission;

    SecurityUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
