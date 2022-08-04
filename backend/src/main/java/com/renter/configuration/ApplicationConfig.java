package com.renter.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableJpaAuditing
@EnableWebMvc
public class ApplicationConfig {

    @Bean(name = "javaTimeObjectMapper")
    public ObjectMapper getObjectMapper() {
        return new ObjectMapper().registerModule(new JavaTimeModule()).configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder(12);
    }

}
