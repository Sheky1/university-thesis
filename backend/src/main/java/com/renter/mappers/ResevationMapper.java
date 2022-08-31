package com.renter.mappers;

import com.renter.domain.ReservationEntity;
import com.renter.dto.request.ReservationRequestDto;
import com.renter.dto.response.AdditionDto;
import com.renter.dto.response.ReservationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ResevationMapper {

    private final UserMapper userMapper;
    private final AdditionMapper additionMapper;
    private final VehicleMapper vehicleMapper;

    public ReservationEntity toEntity(ReservationRequestDto reservationRequestDto) {
        ReservationEntity reservationEntity = new ReservationEntity();
        reservationEntity.setPhoneNumber(reservationRequestDto.getPhoneNumber());
        reservationEntity.setApproved(false);
        reservationEntity.setRejected(false);
        reservationEntity.setCompleted(false);
        reservationEntity.setReservationDate(LocalDate.now());
        reservationEntity.setTakingDate(reservationRequestDto.getTakingDate());
        reservationEntity.setReturningDate(reservationRequestDto.getReturningDate());
        return reservationEntity;
    }

    public ReservationDto toDto(ReservationEntity reservationEntity) {
        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setId(reservationEntity.getId());
        reservationDto.setPhoneNumber(reservationEntity.getPhoneNumber());
        reservationDto.setIsApproved(reservationEntity.getApproved());
        reservationDto.setIsCompleted(reservationEntity.getCompleted());
        reservationDto.setIsRejected(reservationEntity.getRejected());
        reservationDto.setReservationDate(reservationEntity.getReservationDate());
        reservationDto.setTakingDate(reservationEntity.getTakingDate());
        reservationDto.setReturningDate(reservationEntity.getReturningDate());
        reservationDto.setCreatedDate(reservationEntity.getCreatedDate());
        reservationDto.setLastModifiedDate(reservationEntity.getLastModifiedDate());
        reservationDto.setVersion(reservationEntity.getVersion());
        reservationDto.setUser(userMapper.toDto(reservationEntity.getUser()));
        reservationDto.setVehicle(vehicleMapper.toDto(reservationEntity.getVehicle()));
        List<AdditionDto> additions = reservationEntity.getVehicle().getAdditions().stream().map(additionMapper::toDto).toList();
        reservationDto.setAdditions(additions);
        return reservationDto;
    }

}
