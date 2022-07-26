package com.renter.utility;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;

public enum CityFields implements SortingField{
    ID("id"),
    NAME("name"),
    ADDRESS("address"),
    PHONE("phone"),
    EMAIL("email"),
    PIB("pib"),
    CREATED_DATE("createdDate"),
    LAST_MODIFIED("lastModified");

    final String field;

    CityFields(String field) {
        this.field = field;
    }

    @Override
    public String getField() {
        return field;
    }

    @JsonCreator
    public static CityFields getByField(String field) {
        return Arrays.stream(values()).filter(productListFields -> productListFields.getField().equals(field)).findFirst().orElseThrow(IllegalArgumentException::new);
    }
}
