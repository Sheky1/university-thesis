package com.renter.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class AuthUserRequest {

    @Schema(example = "dsejat")
    private String username;

    @Schema(example = "password")
    private String password;

}
