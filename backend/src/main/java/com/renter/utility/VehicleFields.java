package com.renter.utility;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;

public enum VehicleFields implements SortingField{
    ID("id"),
    NAME("name"),
    TRANSMISSION_TYPE("transmissionType"),
    REGISTRATION_NUMBER("registrationNumber"),
    PASSENGER_COUNT("passengerCount"),
    DOOR_COUNT("doorCount"),
    YEAR("year"),
    CUBIC_SIZE("cubicSize"),
    PRICE("price"),
    DEPOSIT_PRICE("depositPrice"),
    CREATED_DATE("createdDate"),
    LAST_MODIFIED("lastModified");

    final String field;

    VehicleFields(String field) {
        this.field = field;
    }

    @Override
    public String getField() {
        return field;
    }

    @JsonCreator
    public static VehicleFields getByField(String field) {
        return Arrays.stream(values()).filter(productListFields -> productListFields.getField().equals(field)).findFirst().orElseThrow(IllegalArgumentException::new);
    }
}
