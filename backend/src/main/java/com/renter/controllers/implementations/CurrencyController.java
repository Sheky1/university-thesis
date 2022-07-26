package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.CurrencyAPI;
import com.renter.dto.response.CurrencyDto;
import com.renter.services.interfaces.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/currencies")
@RequiredArgsConstructor
public class CurrencyController implements CurrencyAPI {

    private final CurrencyService currencyService;

    @Override
    @PostMapping
    public ResponseEntity<CurrencyDto> createCurrency(@RequestParam String name) {
        return new ResponseEntity<>(currencyService.createCurrency(name), HttpStatus.CREATED);
    }
}
