package com.renter.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCityDto {

    @NotBlank(message = "Polje 'ime' je neophodno.")
    @Schema(example = "Beograd")
    private String name;

}
