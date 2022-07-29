package com.renter.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgencyRequestDto {

    @NotBlank(message = "Name is required.")
    @Schema(example = "Rent a car agencija")
    private String name;

    @NotBlank(message = "Address is required.")
    @Schema(example = "Zemunska 2")
    private String address;

    @NotBlank(message = "Logo url is required.")
    @Schema(example = "example url")
    private String logoUrl;

    @NotNull(message = "City id is required.")
    @Schema(example = "1")
    private Long cityId;

    @NotBlank(message = "Username is required.")
    @Schema(example = "dsejat")
    private String username;

    @NotBlank(message = "Email is required.")
    @Schema(example = "dsejat@gmail.com")
    private String email;

    @NotBlank(message = "Password is required.")
    @Schema(example = "password")
    private String password;

}
