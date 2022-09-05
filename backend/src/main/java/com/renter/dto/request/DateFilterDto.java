package com.renter.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DateFilterDto {

    @NotNull(message = "Taking date is required.")
    @Schema(example = "2022-09-20T00:00:00")
    private LocalDate takingDate;

    @NotNull(message = "Taking date is required.")
    @Schema(example = "2022-09-27T00:00:00")
    private LocalDate returningDate;

}
