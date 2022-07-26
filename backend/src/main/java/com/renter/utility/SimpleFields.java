package com.renter.utility;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;

public enum SimpleFields implements SortingField{
    ID("id"),
    NAME("name"),
    CREATED_DATE("createdDate"),
    LAST_MODIFIED("lastModified");

    final String field;

    SimpleFields(String field) {
        this.field = field;
    }

    @Override
    public String getField() {
        return field;
    }

    @JsonCreator
    public static SimpleFields getByField(String field) {
        return Arrays.stream(values()).filter(productListFields -> productListFields.getField().equals(field)).findFirst().orElseThrow(IllegalArgumentException::new);
    }
}
