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
public class VehicleRequestDto {

    @NotBlank(message = "Name is required.")
    @Schema(example = "Audi A4")
    private String name;

    @NotBlank(message = "Transmission type is required.")
    @Schema(example = "Automatic")
    private String transmissionType;

    @NotBlank(message = "Registration number is required.")
    @Schema(example = "BG-1010-HW")
    private String registerNumber;

    @NotNull(message = "Passenger count is required.")
    @Schema(example = "5")
    private Integer passengerCount;

    @NotNull(message = "Door count is required.")
    @Schema(example = "5")
    private Integer doorCount;

    @NotNull(message = "Year is required.")
    @Schema(example = "2018")
    private Integer year;

    @NotNull(message = "Cubic size is required.")
    @Schema(example = "2000")
    private Integer cubicSize;

    @NotNull(message = "Price is required.")
    @Schema(example = "150")
    private Double price;

    @NotNull(message = "Deposit price is required.")
    @Schema(example = "10")
    private Double depositPrice;

    @NotNull(message = "You need to define whether the vehicle has a deposit.")
    @Schema(example = "false")
    private Boolean hasDeposit;

    @NotNull(message = "Vehicle size id is required.")
    @Schema(example = "1")
    private Long vehicleSizeId;

    @NotNull(message = "Fuel type id is required.")
    @Schema(example = "1")
    private Long fuelTypeId;

    @NotNull(message = "Currency id is required.")
    @Schema(example = "1")
    private Long currencyId;

}
