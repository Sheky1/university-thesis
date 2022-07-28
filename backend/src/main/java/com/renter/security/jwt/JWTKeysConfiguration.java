package com.renter.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

@Configuration
public class JWTKeysConfiguration {

    @Bean
    public PrivateKey privateKey(@Value("${jwt.private.key}") String privateKeyPath) throws Exception {
        byte[] keyBytes = Files.readAllBytes(new ClassPathResource(privateKeyPath).getFile().toPath());

        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePrivate(spec);
    }

    @Bean
    public PublicKey publicKey(@Value("${jwt.public.key}") String publicKeyPath) throws Exception {
        byte[] keyBytes = Files.readAllBytes(new ClassPathResource(publicKeyPath).getFile().toPath());

        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePublic(spec);
    }

}
