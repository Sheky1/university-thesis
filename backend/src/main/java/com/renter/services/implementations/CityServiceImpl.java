package com.renter.services.implementations;

import com.renter.domain.CityEntity;
import com.renter.dto.response.CityDto;
import com.renter.exceptions.NotFoundException;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.CityMapper;
import com.renter.repositories.CityRepository;
import com.renter.services.interfaces.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    @Override
    public CityDto createCity(String name) {
        if (cityRepository.findByName(name).isPresent())
            throw new UniqueValueException("Neophodno je uneti naziv koji nije već u sistemu.");
        CityEntity cityEntity = cityMapper.toEntity(name);
        return cityMapper.toDto(cityRepository.save(cityEntity));
    }

    @Override
    public CityDto updateCity(Long id, String name) {
        CityEntity cityEntity = cityRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi grad ne postoji."));
        cityEntity.setName(name);
        return cityMapper.toDto(cityRepository.save(cityEntity));
    }

    @Override
    public void deleteCity(Long id) {
        CityEntity cityEntity = cityRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi grad ne postoji."));
        cityRepository.delete(cityEntity);
    }

    @Override
    public List<CityDto> getAllCities(Pageable pageable) {
        return cityRepository.findAll(pageable).map(cityMapper::toDto).stream().toList();
    }

    @Override
    public List<CityDto> getAllCities() {
        return cityRepository.findAll().stream().map(cityMapper::toDto).toList();
    }

    @Override
    public CityDto getCityById(Long id) {
        return cityMapper.toDto(cityRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi grad ne postoji.")));
    }
}
