package com.renter.services.implementations;

import com.renter.domain.RoleEntity;
import com.renter.domain.UserDomain;
import com.renter.dto.request.AuthUserRequest;
import com.renter.dto.request.UserRequestDto;
import com.renter.dto.response.UserDto;
import com.renter.dto.response.auth.LoginDto;
import com.renter.exceptions.NotFoundException;
import com.renter.exceptions.UnauthorizedException;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.UserMapper;
import com.renter.repositories.RoleRepository;
import com.renter.repositories.UserDomainRepository;
import com.renter.security.roles.SecurityUserRole;
import com.renter.services.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserDomainRepository userDomainRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginDto login(AuthUserRequest authUserRequest) {
        UserDomain user = userDomainRepository.findByUsername(authUserRequest.getUsername()).orElseThrow(() -> new UnauthorizedException("Korisnik sa zadatim kredencijalima ne postoji."));
        if(!passwordEncoder.matches(authUserRequest.getPassword(), user.getPassword())) throw new UnauthorizedException("Korisnik sa zadatim kredencijalima ne postoji.");
        LoginDto loginDto = new LoginDto();
        loginDto.setUser(userMapper.toDto(user));
        return loginDto;
    }

    @Override
    public UserDto register(UserRequestDto userRequestDto) {
        if(userDomainRepository.findByUsername(userRequestDto.getUsername()).isPresent()) throw new UniqueValueException("Korisnik sa zadatim korisničkim imenom već postoji.");
        if(userDomainRepository.findByEmail(userRequestDto.getEmail()).isPresent()) throw new UniqueValueException("Korisnik sa zadatim e-mailom već postoji.");
        UserDomain newUser = userMapper.toEntity(userRequestDto);
        RoleEntity role = roleRepository.findByName(userRequestDto.getRole()).orElseThrow(() -> new NotFoundException("Tražena uloga ne postoji."));
        newUser.setRole(role);
        return userMapper.toDto(userDomainRepository.save(newUser));
    }


}
