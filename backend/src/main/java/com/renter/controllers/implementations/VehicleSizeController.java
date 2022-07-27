package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.VehicleSizeAPI;
import com.renter.dto.request.FuelSizeRequestDto;
import com.renter.dto.response.VehicleSizeDto;
import com.renter.services.interfaces.VehicleSizeService;
import com.renter.utility.SimpleFields;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/vehicle-sizes")
@RequiredArgsConstructor
public class VehicleSizeController implements VehicleSizeAPI {

    private final VehicleSizeService vehicleSizeService;

    @Override
    @PostMapping
    public ResponseEntity<VehicleSizeDto> createVehicleSize(@RequestBody FuelSizeRequestDto fuelSizeRequestDto) {
        return new ResponseEntity<>(vehicleSizeService.createVehicleSize(fuelSizeRequestDto), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    public VehicleSizeDto updateVehicleSize(@PathVariable Long id, @Valid @RequestBody FuelSizeRequestDto fuelSizeRequestDto) {
        return vehicleSizeService.updateVehicleSize(id, fuelSizeRequestDto);
    }

    @Override
    @DeleteMapping("/{id}")
    public void deleteVehicleSize(@PathVariable Long id) {
        vehicleSizeService.deleteVehicleSize(id);
    }

    @Override
    @GetMapping
    public List<VehicleSizeDto> getAllVehicleSize(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return vehicleSizeService.getAllVehicleSizes(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    public List<VehicleSizeDto> getAllVehicleSize() {
        return vehicleSizeService.getAllVehicleSizes();
    }

    @Override
    @GetMapping("/{id}")
    public VehicleSizeDto getVehicleSizeById(@PathVariable Long id) {
        return vehicleSizeService.getVehicleSizeById(id);
    }
}
