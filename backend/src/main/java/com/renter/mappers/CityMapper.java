package com.renter.mappers;

import com.renter.domain.CityEntity;
import com.renter.dto.response.CityDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CityMapper {

    public CityEntity toEntity(String name) {
        CityEntity cityEntity = new CityEntity();
        cityEntity.setName(name);
        cityEntity.setAgencies(new ArrayList<>());
        return cityEntity;
    }

    public CityDto toDto(CityEntity cityEntity) {
        CityDto cityDto = new CityDto();
        cityDto.setId(cityEntity.getId());
        cityDto.setName(cityEntity.getName());
        cityDto.setCreatedDate(cityEntity.getCreatedDate());
        cityDto.setLastModifiedDate(cityEntity.getLastModifiedDate());
        cityDto.setVersion(cityEntity.getVersion());
        return cityDto;
    }

}
