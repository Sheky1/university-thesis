package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.VehicleAPI;
import com.renter.dto.request.VehicleRequestDto;
import com.renter.dto.response.VehicleDto;
import com.renter.services.interfaces.VehicleService;
import com.renter.utility.VehicleFields;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
@RequiredArgsConstructor
public class VehicleController implements VehicleAPI {

    private final VehicleService vehicleService;

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('vehicle:write')")
    public ResponseEntity<VehicleDto> createVehicle(@RequestBody VehicleRequestDto vehicleRequestDto) {
        return new ResponseEntity<>(vehicleService.createVehicle(vehicleRequestDto), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('vehicle:write')")
    public VehicleDto updateVehicle(@PathVariable Long id,@RequestBody VehicleRequestDto vehicleRequestDto) {
        return vehicleService.updateVehicle(id, vehicleRequestDto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('vehicle:write')")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('vehicle:read')")
    public List<VehicleDto> getAllVehicles(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") VehicleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return vehicleService.getAllVehicles(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    @PreAuthorize("hasAuthority('vehicle:read')")
    public List<VehicleDto> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('vehicle:read')")
    public VehicleDto getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }
}
