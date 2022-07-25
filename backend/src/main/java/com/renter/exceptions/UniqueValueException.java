package com.renter.exceptions;

public class UniqueValueException extends RuntimeException{

    public UniqueValueException(String message) {
        super(message);
    }

    public UniqueValueException(String message, Throwable cause) {
        super(message, cause);
    }
}