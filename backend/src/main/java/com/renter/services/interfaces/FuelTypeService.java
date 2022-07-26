package com.renter.services.interfaces;

import com.renter.dto.request.FuelTypeRequestDto;
import com.renter.dto.response.FuelTypeDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FuelTypeService {

    FuelTypeDto createFuelType(FuelTypeRequestDto fuelTypeRequestDto);
    FuelTypeDto updateFuelType(Long id, FuelTypeRequestDto fuelTypeRequestDto);
    void deleteFuelType(Long id);
    List<FuelTypeDto> getAllFuelTypes(Pageable pageable);
    List<FuelTypeDto> getAllFuelTypes();
    FuelTypeDto getFuelTypeById(Long id);

}
