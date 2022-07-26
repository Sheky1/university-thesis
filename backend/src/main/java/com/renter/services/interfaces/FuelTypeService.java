package com.renter.services.interfaces;

import com.renter.dto.request.FuelSizeRequestDto;
import com.renter.dto.response.FuelTypeDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FuelTypeService {

    FuelTypeDto createFuelType(FuelSizeRequestDto fuelTypeRequestDto);
    FuelTypeDto updateFuelType(Long id, FuelSizeRequestDto fuelTypeRequestDto);
    void deleteFuelType(Long id);
    List<FuelTypeDto> getAllFuelTypes(Pageable pageable);
    List<FuelTypeDto> getAllFuelTypes();
    FuelTypeDto getFuelTypeById(Long id);

}
