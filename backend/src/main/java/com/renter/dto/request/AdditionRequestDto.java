package com.renter.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdditionRequestDto {

    @NotBlank(message = "Name is required.")
    @Schema(example = "Rent a car agencija")
    private String name;

    @NotBlank(message = "Price is required.")
    @Schema(example = "5.5")
    private Double price;

}
