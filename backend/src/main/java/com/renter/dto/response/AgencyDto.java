package com.renter.dto.response;

import com.renter.dto.response.base.BaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class AgencyDto  extends BaseDto {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Rent a car Beograd")
    private String name;
    @Schema(example = "Makedonska 30")
    private String address;
    @Schema(example = "Url do logo slike")
    private String logoUrl;
    @Schema(implementation = CityDto.class)
    private CityDto city;
    @Schema(implementation = List.class)
    private List<AdditionDto> additions;
    @Schema(implementation = List.class)
    private List<FuelTypeDto> fuelTypes;
    @Schema(implementation = List.class)
    private List<VehicleSizeDto> vehicleSizes;
    @Schema(implementation = UserDto.class)
    private UserDto user;

}
