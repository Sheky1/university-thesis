package com.renter.mappers;

import com.renter.domain.CityEntity;
import com.renter.dto.request.CreateCityDto;
import com.renter.dto.response.CityDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CityMapper {

    public CityEntity toEntity(CreateCityDto createCityDto) {
        CityEntity cityEntity = new CityEntity();
        cityEntity.setName(createCityDto.getName());
        cityEntity.setAgencies(new ArrayList<>());
        return cityEntity;
    }

    public CityDto toDto(CityEntity cityEntity) {
        CityDto cityDto = new CityDto();
        cityDto.setId(cityEntity.getId());
        cityDto.setName((cityDto.getName()));
        cityDto.setCreatedDate(cityDto.getCreatedDate());
        cityDto.setLastModifiedDate(cityDto.getLastModifiedDate());
        cityDto.setVersion(cityDto.getVersion());
        return cityDto;
    }

}
