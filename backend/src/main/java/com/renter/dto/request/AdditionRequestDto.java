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
public class AdditionRequestDto {

    @NotBlank(message = "Name is required.")
    @Schema(example = "Sediste za bebu")
    private String name;

    @NotBlank(message = "Price is required.")
    @Schema(example = "5.5")
    private Double price;

    @NotNull(message = "User id is required.")
    @Schema(example = "1")
    private Long userId;

    @NotNull(message = "Currency id is required.")
    @Schema(example = "1")
    private Long currencyId;

}
