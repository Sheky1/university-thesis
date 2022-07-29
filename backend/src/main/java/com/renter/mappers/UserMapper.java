package com.renter.mappers;

import com.renter.domain.AgencyEntity;
import com.renter.domain.UserDomain;
import com.renter.dto.request.AgencyRequestDto;
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

    public UserDomain toEntity(AgencyRequestDto agencyRequestDto) {
        UserDomain userDomain = new UserDomain();
        userDomain.setUsername(agencyRequestDto.getUsername());
        userDomain.setEmail(agencyRequestDto.getEmail());
        userDomain.setPassword(passwordEncoder.encode(agencyRequestDto.getPassword()));
        return userDomain;
    }

    public void updateUser(UserDomain userDomain, AgencyRequestDto agencyRequestDto) {
        userDomain.setUsername(agencyRequestDto.getUsername());
        userDomain.setEmail(agencyRequestDto.getEmail());
        userDomain.setPassword(passwordEncoder.encode(agencyRequestDto.getPassword()));
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
