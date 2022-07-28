package com.renter.security.jwt;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTTokenHandler jwtTokenHandler;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!StringUtils.startsWith(header, "Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = header.split(" ")[1].trim();
        Set<SimpleGrantedAuthority> simpleGrantedAuthorities = null;
        try {
            simpleGrantedAuthorities = this.jwtTokenHandler.validate(token);
            if (simpleGrantedAuthorities == null) {
                response.setStatus(401);
                return;
            }
        } catch (Exception e) {
            response.setStatus(401);
        }

        Authentication authentication = new JWTAuthentication(token, simpleGrantedAuthorities);
        authentication.setAuthenticated(true);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);

    }
}
