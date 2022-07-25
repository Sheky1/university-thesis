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
public class CityDto extends BaseDto {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "Beograd")
    private String name;

}
