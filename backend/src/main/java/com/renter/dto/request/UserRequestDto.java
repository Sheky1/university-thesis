package com.renter.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    @NotBlank(message = "Username is required.")
    @Schema(example = "dsejat")
    private String username;

    @NotBlank(message = "Email is required.")
    @Schema(example = "dsejat@gmail.com")
    private String email;

    @NotBlank(message = "Password is required.")
    @Schema(example = "password")
    private String password;

    @NotBlank(message = "Name is required.")
    @Schema(example = "Dimitrije")
    private String name;

    @NotBlank(message = "Surname is required.")
    @Schema(example = "Sejat")
    private String surname;

    @NotBlank(message = "Role is required.")
    @Schema(example = "ADMIN")
    private String role;

}
