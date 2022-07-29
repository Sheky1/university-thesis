package com.renter.mappers;

import com.renter.domain.UserDomain;
import com.renter.dto.request.UserRequestDto;
import com.renter.dto.response.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public UserDomain toEntity(UserRequestDto userRequestDto) {
        UserDomain userDomain = new UserDomain();
        userDomain.setUsername(userRequestDto.getUsername());
        userDomain.setEmail(userRequestDto.getEmail());
        userDomain.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        userDomain.setName(userRequestDto.getName());
        userDomain.setSurname(userRequestDto.getSurname());
        return userDomain;
    }

    public UserDto toDto(UserDomain userDomain) {
        UserDto userDto = new UserDto();
        userDto.setId(userDomain.getId());
        userDto.setUsername(userDomain.getUsername());
        userDto.setEmail(userDomain.getEmail());
        userDto.setName(userDomain.getName());
        userDto.setSurname(userDomain.getSurname());
        userDto.setRole(userDomain.getRole().getName());
        userDto.setCreatedDate(userDomain.getCreatedDate());
        userDto.setLastModifiedDate(userDomain.getLastModifiedDate());
        userDto.setVersion(userDomain.getVersion());
        return userDto;
    }

}
