package com.renter.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customConfiguration(){
        return new OpenAPI()
//                .components(new Components().addSecuritySchemes("bearer-jwt",
//                        new SecurityScheme()
//                                .name(HttpHeaders.AUTHORIZATION)
//                                .type(SecurityScheme.Type.HTTP)
//                                .scheme("Bearer")
//                                .bearerFormat("JWT")
//                                .in(SecurityScheme.In.HEADER)))
                .info(new Info()
                        .title("Renter API Docs")
                        .description("REST API documentation"));
//                .addSecurityItem(
//                        new SecurityRequirement().addList("bearer-jwt", Arrays.asList("read", "write")));
    }

}
