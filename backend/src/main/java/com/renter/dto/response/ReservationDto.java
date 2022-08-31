package com.renter.dto.response;

import com.renter.domain.VehicleEntity;
import com.renter.dto.response.base.BaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ReservationDto extends BaseDto {

    @Schema(example = "1")
    private Long id;
    @Schema(example = "0691160311")
    private String phoneNumber;
    @Schema(implementation = LocalDate.class)
    private LocalDate reservationDate;
    @Schema(implementation = LocalDate.class)
    private LocalDate takingDate;
    @Schema(implementation = LocalDate.class)
    private LocalDate returningDate;
    @Schema(example = "true")
    private Boolean isApproved;
    @Schema(example = "false")
    private Boolean isCompleted;
    @Schema(example = "false")
    private Boolean isRejected;
    @Schema(implementation = VehicleDto.class)
    private VehicleDto vehicle;
    @Schema(implementation = UserDto.class)
    private UserDto user;
    @Schema(implementation = List.class)
    private List<AdditionDto> additions;


}
