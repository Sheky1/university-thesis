package com.renter.mappers;

import com.renter.domain.VehicleSizeEntity;
import com.renter.dto.response.VehicleSizeDto;
import org.springframework.stereotype.Component;

@Component
public class VehicleSizeMapper {

    public VehicleSizeEntity toEntity(String name) {
        VehicleSizeEntity vehicleSizeEntity = new VehicleSizeEntity();
        vehicleSizeEntity.setName(name);
        return vehicleSizeEntity;
    }

    public VehicleSizeDto toDto(VehicleSizeEntity vehicleSizeEntity) {
        VehicleSizeDto vehicleSizeDto = new VehicleSizeDto();
        vehicleSizeDto.setId(vehicleSizeEntity.getId());
        vehicleSizeDto.setName(vehicleSizeEntity.getName());
        vehicleSizeDto.setCreatedDate(vehicleSizeEntity.getCreatedDate());
        vehicleSizeDto.setLastModifiedDate(vehicleSizeEntity.getLastModifiedDate());
        vehicleSizeDto.setVersion(vehicleSizeEntity.getVersion());
        return vehicleSizeDto;
    }

}
