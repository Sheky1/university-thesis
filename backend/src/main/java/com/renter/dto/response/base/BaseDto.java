package com.renter.dto.response.base;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseDto {
    @Schema(implementation = LocalDate.class)
    private LocalDate createdDate;
    @Schema(implementation = LocalDate.class)
    private LocalDate lastModifiedDate;
    @Schema(implementation = LocalDate.class)
    private Long version;
}
