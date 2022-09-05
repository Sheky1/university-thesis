package com.renter.services.interfaces;

import com.renter.dto.request.DateFilterDto;
import com.renter.dto.request.VehicleRequestDto;
import com.renter.dto.response.ReservationDto;
import com.renter.dto.response.VehicleDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleService {

    VehicleDto createVehicle(VehicleRequestDto vehicleRequestDto);
    VehicleDto updateVehicle(Long id, VehicleRequestDto vehicleRequestDto);
    void deleteVehicle(Long id);
    List<VehicleDto> getAllVehicles(Pageable pageable);
    List<VehicleDto> getAllVehicles();
    VehicleDto getVehicleById(Long id);
    List<VehicleDto> filterVehiclesByDate(DateFilterDto dateFilterDto);
}
