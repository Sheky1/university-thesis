package com.renter.dto.response;

import com.renter.dto.response.base.BaseDto;
import com.renter.security.roles.SecurityUserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class UserDto extends BaseDto {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "dsejat")
    private String username;
    @Schema(example = "dsejat@gmail.com")
    private String email;
    @Schema(example = "Dimitrije")
    private String name;
    @Schema(example = "Sejat")
    private String surname;
    @Schema(example = "ADMIN")
    private String role;
}
