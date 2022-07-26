package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.CityAPI;
import com.renter.dto.response.CityDto;
import com.renter.services.interfaces.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cities")
@RequiredArgsConstructor
public class CityController implements CityAPI {

    private final CityService cityService;

    @Override
    @PostMapping
    public ResponseEntity<CityDto> createCity(@RequestParam String name) {
        return new ResponseEntity<>(cityService.createCity(name), HttpStatus.CREATED);
    }

}