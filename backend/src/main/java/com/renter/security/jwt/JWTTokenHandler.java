package com.renter.security.jwt;


import com.renter.security.roles.SecurityUserRoleInterface;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JWTTokenHandler {

    private final PrivateKey privateKey;
    private final PublicKey publicKey;
    private final int jwtExpirationInMs;

    @Autowired
    public JWTTokenHandler(PrivateKey privateKey, PublicKey publicKey, @Value("${jwt.expirationDateInMs}") int jwtExpirationInMs){
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.jwtExpirationInMs = jwtExpirationInMs;
    }

    public String generateAccessToken(SecurityUserRoleInterface role) throws Exception {
        String jwtIssuer = "renter";
        return Jwts.builder()
                //.setSubject(format("%s,%s", user.getId(), user.getUsername()))
                .claim("authorities", role.getGrantedAuthorities())
                .setIssuer(jwtIssuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs)) // 5 hours
                .signWith(SignatureAlgorithm.RS256, privateKey)
                .compact();
    }

    public Set<SimpleGrantedAuthority> validate(String token) {
        try {
            Jws<Claims> claimsJwts = Jwts.parser().setSigningKey(publicKey).parseClaimsJws(token);

            Claims body = claimsJwts.getBody();

            List<Map<String, String>> authorities = (List<Map<String, String>>) body.get("authorities");

            return authorities.stream()
                    .map(authorityMap -> new SimpleGrantedAuthority(authorityMap.get("authority")))
                    .collect(Collectors.toSet());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Invalid token", e);
        }
    }

}
