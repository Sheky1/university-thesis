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
public class VehicleSizeDto extends BaseDto {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Veliko vozilo")
    private String name;

}
