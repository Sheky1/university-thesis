package com.renter.services.interfaces;

import com.renter.dto.response.CityDto;
import org.springframework.stereotype.Service;

@Service
public interface CityService {

    CityDto createCity(String name);

}
