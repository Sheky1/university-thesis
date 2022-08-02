package com.renter.mappers;

import com.renter.domain.AgencyEntity;
import com.renter.domain.UserDomain;
import com.renter.dto.request.AgencyRequestDto;
import com.renter.dto.response.AgencyDto;
import com.renter.dto.response.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class AgencyMapper {

    private final AdditionMapper additionMapper;
    private final FuelTypeMapper fuelTypeMapper;
    private final VehicleSizeMapper vehicleSizeMapper;
    private final CityMapper cityMapper;

    public AgencyEntity toEntity(AgencyRequestDto agencyRequestDto) {
        AgencyEntity agencyEntity = new AgencyEntity();
        agencyEntity.setName(agencyRequestDto.getName());
        agencyEntity.setAddress(agencyRequestDto.getAddress());
        agencyEntity.setLogoUrl(agencyRequestDto.getLogoUrl());
        agencyEntity.setAdditions(new ArrayList<>());
        agencyEntity.setFuelTypes(new ArrayList<>());
        agencyEntity.setVehicleSizes(new ArrayList<>());
        agencyEntity.setVehicles(new ArrayList<>());
        return agencyEntity;
    }

    public void updateAgency(AgencyEntity agencyEntity, AgencyRequestDto agencyRequestDto) {
        agencyEntity.setName(agencyRequestDto.getName());
        agencyEntity.setAddress(agencyRequestDto.getAddress());
        agencyEntity.setLogoUrl(agencyRequestDto.getLogoUrl());
    }

    public AgencyDto toDto(AgencyEntity agencyEntity) {
        AgencyDto agencyDto = new AgencyDto();
        agencyDto.setId(agencyEntity.getId());
        agencyDto.setName(agencyEntity.getName());
        agencyDto.setAddress(agencyEntity.getAddress());
        agencyDto.setLogoUrl(agencyEntity.getLogoUrl());
        agencyDto.setCreatedDate(agencyEntity.getCreatedDate());
        agencyDto.setLastModifiedDate(agencyEntity.getLastModifiedDate());
        agencyDto.setVersion(agencyEntity.getVersion());
        agencyDto.setCity(cityMapper.toDto(agencyEntity.getCity()));
        agencyDto.setAdditions(agencyEntity.getAdditions().stream().map(additionMapper::toDto).toList());
        agencyDto.setFuelTypes(agencyEntity.getFuelTypes().stream().map(fuelTypeMapper::toDto).toList());
        agencyDto.setVehicleSizes(agencyEntity.getVehicleSizes().stream().map(vehicleSizeMapper::toDto).toList());

        UserDto userDto = new UserDto();
        userDto.setId(agencyEntity.getUser().getId());
        userDto.setUsername(agencyEntity.getUser().getUsername());
        userDto.setEmail(agencyEntity.getUser().getEmail());
        userDto.setRole(agencyEntity.getUser().getRole().getName());
        userDto.setCreatedDate(agencyEntity.getUser().getCreatedDate());
        userDto.setLastModifiedDate(agencyEntity.getUser().getLastModifiedDate());
        userDto.setVersion(agencyEntity.getUser().getVersion());
        agencyDto.setUser(userDto);

        return agencyDto;
    }

}
