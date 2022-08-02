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
public class FuelSizeRequestDto {

    @NotBlank(message = "Name is required.")
    @Schema(example = "Benzin")
    private String name;

    @NotNull(message = "Agency id is requred.")
    @Schema(example = "1")
    private Long userId;

}
