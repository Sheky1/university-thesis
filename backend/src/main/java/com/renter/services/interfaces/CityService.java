package com.renter.services.interfaces;

import com.renter.dto.response.CityDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CityService {

    CityDto createCity(String name);
    CityDto updateCity(Long id, String name);
    void deleteCity(Long id);
    List<CityDto> getAllCities(Pageable pageable);
    List<CityDto> getAllCities();
    CityDto getCityById(Long id);

}
