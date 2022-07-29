package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.FuelTypeAPI;
import com.renter.dto.request.FuelSizeRequestDto;
import com.renter.dto.response.FuelTypeDto;
import com.renter.services.interfaces.FuelTypeService;
import com.renter.utility.SimpleFields;
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
@RequestMapping("/fuel-types")
@RequiredArgsConstructor
public class FuelTypeController implements FuelTypeAPI {

    private final FuelTypeService fuelTypeService;

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('fuel-type:write')")
    public ResponseEntity<FuelTypeDto> createFuelType(@RequestBody FuelSizeRequestDto fuelTypeRequestDto) {
        return new ResponseEntity<>(fuelTypeService.createFuelType(fuelTypeRequestDto), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('fuel-type:write')")
    public FuelTypeDto updateFuelType(@PathVariable Long id, @RequestBody FuelSizeRequestDto fuelTypeRequestDto) {
        return fuelTypeService.updateFuelType(id, fuelTypeRequestDto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('fuel-type:write')")
    public void deleteFuelType(@PathVariable Long id) {
        fuelTypeService.deleteFuelType(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('fuel-type:read')")
    public List<FuelTypeDto> getAllFuelTypes(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return fuelTypeService.getAllFuelTypes(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    @PreAuthorize("hasAuthority('fuel-type:read')")
    public List<FuelTypeDto> getAllFuelTypes() {
        return fuelTypeService.getAllFuelTypes();
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('fuel-type:read')")
    public FuelTypeDto getFuelTypeById(@PathVariable Long id) {
        return fuelTypeService.getFuelTypeById(id);
    }
}
