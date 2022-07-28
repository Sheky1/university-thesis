package com.renter.security;

import com.renter.domain.UserDomain;
import com.renter.exceptions.NotFoundException;
import com.renter.repositories.UserDomainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserDomainRepository userDomainRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDomain userDomain = userDomainRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("User with the given username doesn't exist."));
        return new CustomUserDetails(userDomain);
    }
}
