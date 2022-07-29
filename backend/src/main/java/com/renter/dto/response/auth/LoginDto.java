package com.renter.dto.response.auth;

import com.renter.dto.response.UserDto;
import lombok.Data;

@Data
public class LoginDto {

    private UserDto user;
    private String token;

}
