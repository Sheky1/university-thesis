package com.renter.mappers;

import com.renter.domain.VehicleEntity;
import com.renter.dto.request.VehicleRequestDto;
import com.renter.dto.response.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class VehicleMapper {

    public VehicleEntity toEntity(VehicleRequestDto vehicleRequestDto) {
        VehicleEntity vehicleEntity = new VehicleEntity();
        vehicleEntity.setName(vehicleRequestDto.getName());
        vehicleEntity.setPassengerCount(vehicleRequestDto.getPassengerCount());
        vehicleEntity.setDoorCount(vehicleRequestDto.getDoorCount());
        vehicleEntity.setCubicSize(vehicleRequestDto.getCubicSize());
        vehicleEntity.setYear(vehicleRequestDto.getYear());
        vehicleEntity.setDepositPrice(vehicleRequestDto.getDepositPrice());
        vehicleEntity.setPrice(vehicleRequestDto.getPrice());
        vehicleEntity.setHasDeposit(vehicleRequestDto.getHasDeposit());
        vehicleEntity.setRegisterNumber(vehicleRequestDto.getRegisterNumber());
        vehicleEntity.setTransmissionType(vehicleRequestDto.getTransmissionType());
        return vehicleEntity;
    }

    public void updateVehicle(VehicleEntity vehicleEntity, VehicleRequestDto vehicleRequestDto) {
        vehicleEntity.setName(vehicleRequestDto.getName());
        vehicleEntity.setPassengerCount(vehicleRequestDto.getPassengerCount());
        vehicleEntity.setDoorCount(vehicleRequestDto.getDoorCount());
        vehicleEntity.setCubicSize(vehicleRequestDto.getCubicSize());
        vehicleEntity.setYear(vehicleRequestDto.getYear());
        vehicleEntity.setDepositPrice(vehicleRequestDto.getDepositPrice());
        vehicleEntity.setPrice(vehicleRequestDto.getPrice());
        vehicleEntity.setHasDeposit(vehicleRequestDto.getHasDeposit());
        vehicleEntity.setRegisterNumber(vehicleRequestDto.getRegisterNumber());
        vehicleEntity.setTransmissionType(vehicleRequestDto.getTransmissionType());
    }

    public VehicleDto toDto(VehicleEntity vehicleEntity) {
        VehicleDto vehicleDto = new VehicleDto();
        vehicleDto.setId(vehicleEntity.getId());
        vehicleDto.setName(vehicleEntity.getName());
        vehicleDto.setPassengerCount(vehicleEntity.getPassengerCount());
        vehicleDto.setDoorCount(vehicleEntity.getDoorCount());
        vehicleDto.setCubicSize(vehicleEntity.getCubicSize());
        vehicleDto.setYear(vehicleEntity.getYear());
        vehicleDto.setDepositPrice(vehicleEntity.getDepositPrice());
        vehicleDto.setPrice(vehicleEntity.getPrice());
        vehicleDto.setHasDeposit(vehicleEntity.getHasDeposit());
        vehicleDto.setRegisterNumber(vehicleEntity.getRegisterNumber());
        vehicleDto.setTransmissionType(vehicleEntity.getTransmissionType());
        vehicleDto.setCreatedDate(vehicleEntity.getCreatedDate());
        vehicleDto.setLastModifiedDate(vehicleEntity.getLastModifiedDate());
        vehicleDto.setVersion(vehicleEntity.getVersion());
        vehicleDto.setCurrency(new CurrencyDto(vehicleEntity.getCurrency().getId(), vehicleEntity.getCurrency().getName()));
        vehicleDto.setVehicleSize(new VehicleSizeDto(vehicleEntity.getVehicleSize().getId(), vehicleEntity.getVehicleSize().getName()));
        vehicleDto.setFuelType(new FuelTypeDto(vehicleEntity.getFuelType().getId(), vehicleEntity.getFuelType().getName()));
        vehicleDto.setAdditions(vehicleEntity.getAdditions().stream()
                .map(additionEntity -> new AdditionDto(additionEntity.getId(), additionEntity.getName(), additionEntity.getPrice(),
                        new CurrencyDto(additionEntity.getCurrency().getId(), additionEntity.getCurrency().getName()))).toList());
        vehicleDto.setImages(vehicleEntity.getImages().stream()
                .map(imageEntity -> new ImageDto(imageEntity.getId(), imageEntity.getUrl())).toList());
        return vehicleDto;
    }

}
