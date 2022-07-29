package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.AuthAPI;
import com.renter.dto.request.AuthUserRequest;
import com.renter.dto.request.UserRequestDto;
import com.renter.dto.response.UserDto;
import com.renter.dto.response.auth.LoginDto;
import com.renter.exceptions.BadRequestException;
import com.renter.security.jwt.JWTTokenHandler;
import com.renter.security.roles.SecurityUserRole;
import com.renter.services.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController implements AuthAPI {

    private final JWTTokenHandler jwtTokenHandler;
    private final AuthService authService;

    @Override
    @PostMapping("/login")
    public ResponseEntity<LoginDto> login(@RequestBody @Valid AuthUserRequest authUserRequest) {
       LoginDto loginDto = authService.login(authUserRequest);
        try {
            loginDto.setToken(this.jwtTokenHandler.generateAccessToken(SecurityUserRole.valueOf(loginDto.getUser().getRole())));
            return new ResponseEntity<>(loginDto, HttpStatus.OK);
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.AUTHORIZATION, this.jwtTokenHandler.generateAccessToken(securityUserRole))
//                    .build();
        }catch(BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid role provided.");
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(UserRequestDto userRequestDto) {
        return new ResponseEntity<>(authService.register(userRequestDto), HttpStatus.CREATED);
    }

}
