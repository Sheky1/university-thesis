package com.renter.mappers;

import com.renter.domain.FuelTypeEntity;
import com.renter.dto.response.FuelTypeDto;
import org.springframework.stereotype.Component;

@Component
public class FuelTypeMapper {

    public FuelTypeEntity toEntity(String name) {
        FuelTypeEntity fuelTypeEntity = new FuelTypeEntity();
        fuelTypeEntity.setName(name);
        return fuelTypeEntity;
    }

    public FuelTypeDto toDto(FuelTypeEntity fuelTypeEntity) {
        FuelTypeDto fuelTypeDto = new FuelTypeDto();
        fuelTypeDto.setId(fuelTypeEntity.getId());
        fuelTypeDto.setName(fuelTypeEntity.getName());
        fuelTypeDto.setCreatedDate(fuelTypeEntity.getCreatedDate());
        fuelTypeDto.setLastModifiedDate(fuelTypeEntity.getLastModifiedDate());
        fuelTypeDto.setVersion(fuelTypeEntity.getVersion());
        return fuelTypeDto;
    }

}
