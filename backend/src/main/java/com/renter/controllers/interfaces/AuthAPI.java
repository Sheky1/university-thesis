package com.renter.controllers.interfaces;

import com.renter.dto.request.AuthUserRequest;
import com.renter.dto.request.UserRequestDto;
import com.renter.dto.response.UserDto;
import com.renter.dto.response.auth.LoginDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

public interface AuthAPI {

    @Operation(summary = "Login", description = "This endpoint is for user to log in.", tags = "Auth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully logged in"),
            @ApiResponse(responseCode = "401", description = "Bad credentials")})
    ResponseEntity<LoginDto> login(@RequestBody @Valid AuthUserRequest authUserRequest);

    @Operation(summary = "Register", description = "This endpoint is for registering a user.", tags = "Auth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully registered a user."),
            @ApiResponse(responseCode = "400", description = "Bad request.")})
    ResponseEntity<UserDto> register(@RequestBody @Valid UserRequestDto userRequestDto);

}
