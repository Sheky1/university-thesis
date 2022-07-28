package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.CityAPI;
import com.renter.dto.response.CityDto;
import com.renter.services.interfaces.CityService;
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
@RequestMapping("/cities")
@RequiredArgsConstructor
public class CityController implements CityAPI {

    private final CityService cityService;

    @Override
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CityDto> createCity(@RequestParam String name) {
        return new ResponseEntity<>(cityService.createCity(name), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    public CityDto updateCity(@PathVariable Long id, @RequestParam String name) {
        return cityService.updateCity(id, name);
    }

    @Override
    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable Long id) {
        cityService.deleteCity(id);
    }

    @Override
    @GetMapping
    public List<CityDto> getAllCities(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return cityService.getAllCities(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    public List<CityDto> getAllCities() {
        return cityService.getAllCities();
    }

    @Override
    @GetMapping("/{id}")
    public CityDto getCityById(@PathVariable Long id) {
        return cityService.getCityById(id);
    }

}
