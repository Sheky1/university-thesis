package com.renter.dto.response.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseDto {
    private LocalDate createdDate;
    private LocalDate lastModifiedDate;
    private Long version;
}
