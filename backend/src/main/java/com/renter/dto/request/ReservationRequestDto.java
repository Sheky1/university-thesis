package com.renter.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequestDto {

    @NotBlank(message = "Phone number is required.")
    @Schema(example = "0691160311")
    private String phoneNumber;

    @NotNull(message = "Taking date is required.")
    @Schema(example = "2022-09-20T00:00:00")
    private LocalDate takingDate;

    @NotNull(message = "Taking date is required.")
    @Schema(example = "2022-09-27T00:00:00")
    private LocalDate returningDate;

    @NotBlank(message = "Agency id is required.")
    @Schema(example = "1")
    private Long agencyId;

    @NotNull(message = "User id is required.")
    @Schema(example = "1")
    private Long userId;

    @NotNull(message = "Vehicle id is required.")
    @Schema(example = "1")
    private Long vehicleId;

}
