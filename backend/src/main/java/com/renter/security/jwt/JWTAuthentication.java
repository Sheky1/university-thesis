package com.renter.security.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;

public class JWTAuthentication extends AbstractAuthenticationToken {

    private String token;

    public JWTAuthentication(String token, Set<SimpleGrantedAuthority> simpleGrantedAuthorities) {
        super(simpleGrantedAuthorities);
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }
}
