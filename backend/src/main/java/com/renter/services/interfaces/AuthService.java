package com.renter.services.interfaces;

import com.renter.dto.request.AuthUserRequest;
import com.renter.dto.request.UserRequestDto;
import com.renter.dto.response.UserDto;
import com.renter.security.roles.SecurityUserRole;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    SecurityUserRole login(AuthUserRequest authUserRequest);
    UserDto register(UserRequestDto userRequestDto);

}
