package com.renter.utility;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;

public enum ReservationFields implements SortingField {
    ID("id"),
    PHONE_NUMBER("phoneNumber"),
    IS_APPROVED("isApproved"),
    IS_COMPLETED("isCompleted"),
    ID_REJECTED("isRejected"),
    RESERVATION_DATE("reservationDate"),
    TAKING_DATE("takingDate"),
    RETURNING_DATE("returningDate"),
    CREATED_DATE("createdDate");

    final String field;

    ReservationFields(String field) {
        this.field = field;
    }

    @Override
    public String getField() {
        return field;
    }

    @JsonCreator
    public static ReservationFields getByField(String field) {
        return Arrays.stream(values()).filter(productListFields -> productListFields.getField().equals(field)).findFirst().orElseThrow(IllegalArgumentException::new);
    }
}
