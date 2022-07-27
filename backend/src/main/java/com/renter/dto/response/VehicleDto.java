package com.renter.dto.response;

import com.renter.dto.response.base.BaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class VehicleDto extends BaseDto {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Audi A4")
    private String name;
    @Schema(example = "Automatic")
    private String transmissionType;
    @Schema(example = "BG-1010-HW")
    private String registerNumber;
    @Schema(example = "5")
    private Integer passengerCount;
    @Schema(example = "5")
    private Integer doorCount;
    @Schema(example = "2018")
    private Integer year;
    @Schema(example = "2000")
    private Integer cubicSize;
    @Schema(example = "150")
    private Double price;
    @Schema(example = "10")
    private Double depositPrice;
    @Schema(example = "false")
    private Boolean hasDeposit;

}
