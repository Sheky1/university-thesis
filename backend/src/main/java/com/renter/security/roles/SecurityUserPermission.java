package com.renter.security.roles;

public enum SecurityUserPermission {
    STORE_READ("store:read"),
    STORE_WRITE("store:write"),
    PRODUCT_READ("product:read"),
    PRODUCT_WRITE("product:write"),
    PRODUCT_LIST_READ("productList:read"),
    PRODUCT_LIST_WRITE("productList:write");


    private final String permission;

    SecurityUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
