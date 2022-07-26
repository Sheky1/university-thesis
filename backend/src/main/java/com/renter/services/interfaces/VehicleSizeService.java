package com.renter.services.interfaces;

import com.renter.dto.request.FuelSizeRequestDto;
import com.renter.dto.response.VehicleSizeDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleSizeService {

    VehicleSizeDto createVehicleSize(FuelSizeRequestDto fuelSizeRequestDto);
    VehicleSizeDto updateVehicleSize(Long id, FuelSizeRequestDto fuelSizeRequestDto);
    void deleteVehicleSize(Long id);
    List<VehicleSizeDto> getAllVehicleSizes(Pageable pageable);
    List<VehicleSizeDto> getAllVehicleSizes();
    VehicleSizeDto getVehicleSizeById(Long id);

}
