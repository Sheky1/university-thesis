package com.renter.exceptions;

import lombok.*;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomExceptionResponse {
    private UUID uuid;
    private String message;
    private String httpStatus;
    private int statusCode;
    private ZonedDateTime timestamp;
    private String applicationName;
    private String instanceId;
}
