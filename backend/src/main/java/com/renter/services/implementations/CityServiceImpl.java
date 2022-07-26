package com.renter.services.implementations;

import com.renter.domain.CityEntity;
import com.renter.dto.request.CreateCityDto;
import com.renter.dto.response.CityDto;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.CityMapper;
import com.renter.repositories.CityRepository;
import com.renter.services.interfaces.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    @Override
    public CityDto createCity(String name) {
        if(cityRepository.findByName(name).isPresent()) throw new UniqueValueException("Neophodno je uneti ime koje nije već u sistemu.");
        CityEntity cityEntity = cityMapper.toEntity(name);
        return cityMapper.toDto(cityRepository.save(cityEntity));
    }
}
