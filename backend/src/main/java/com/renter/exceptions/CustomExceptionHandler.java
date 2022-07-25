package com.renter.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(CustomExceptionHandler.class);

    @Value("${spring.application.name}")
    private String appName;
    @Value("${spring.application.id}")
    private String instanceId;

    @ExceptionHandler(value = {BadRequestException.class})
    public ResponseEntity<Object> handleException(BadRequestException exception) {
        return buildResponse(HttpStatus.BAD_REQUEST.toString(), exception.getMessage(), "Bad request.", 400, exception);
    }

    @ExceptionHandler(value = {NotFoundException.class})
    public ResponseEntity<Object> handleException(NotFoundException exception) {
        return buildResponse(HttpStatus.NOT_FOUND.toString(), exception.getMessage(), "Not found exception.", 404, exception);
    }

    @ExceptionHandler(value = {UniqueValueException.class})
    public ResponseEntity<Object> handleException(UniqueValueException exception) {
        return buildResponse(CustomHttpStatus.UNIQUE_VALUE.toString(), exception.getMessage(), "The value must be unique.", 512, exception);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String errorMessage = "Method argument not valid.";
        if (exception.getBindingResult().getFieldError() != null)
            errorMessage = exception.getBindingResult().getFieldError().getDefaultMessage();
        return new ResponseEntity<>(buildAndLog(errorMessage, HttpStatus.BAD_REQUEST.toString(), "Request body invalid.", 400, exception), status);
    }

    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException exception, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return new ResponseEntity<>(buildAndLog(exception.getMessage(), HttpStatus.NOT_FOUND.toString(), "Api route not found.", 404, exception), status);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleException(AccessDeniedException exception) {
        return new ResponseEntity<>(buildAndLog(exception.getMessage(), HttpStatus.FORBIDDEN.toString(), "Access denied.", 403, exception), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleException(RuntimeException exception) {
        return new ResponseEntity<>(buildAndLog(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Runtime exception.", 500, exception), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Object> buildResponse(String httpStatus, String errorMessage, String logMessage, int statusCode, Throwable exception) {
        return ResponseEntity.status(statusCode).body(buildAndLog(errorMessage, httpStatus, logMessage, statusCode, exception));
    }

    private CustomExceptionResponse buildAndLog(String errorMessage, String httpStatus, String logMessage, int statusCode, Throwable exception) {
        CustomExceptionResponse apiException = new CustomExceptionResponse(UUID.randomUUID(), errorMessage, httpStatus, statusCode, ZonedDateTime.now(ZoneId.of("CET")), appName, instanceId);
        logger.error("Exception with UUID: " + apiException.getUuid() + ". Application id: " + instanceId + ", application name: " + appName + ". " + logMessage, exception);
        return apiException;
    }

}
