package com.renter.utility;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;

public enum AgencyFields implements SortingField {
    ID("id"),
    NAME("name"),
    ADDRESS("address"),
    LOGO_URL("logoUrl"),
    CREATED_DATE("createdDate"),
    LAST_MODIFIED("lastModified");

    final String field;

    AgencyFields(String field) {
        this.field = field;
    }

    @Override
    public String getField() {
        return field;
    }

    @JsonCreator
    public static AgencyFields getByField(String field) {
        return Arrays.stream(values()).filter(productListFields -> productListFields.getField().equals(field)).findFirst().orElseThrow(IllegalArgumentException::new);
    }
}
