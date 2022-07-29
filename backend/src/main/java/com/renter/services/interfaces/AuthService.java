package com.renter.services.interfaces;

import com.renter.dto.request.AuthUserRequest;
import com.renter.dto.request.UserRequestDto;
import com.renter.dto.response.UserDto;
import com.renter.dto.response.auth.LoginDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    LoginDto login(AuthUserRequest authUserRequest);
    UserDto register(UserRequestDto userRequestDto);

}
