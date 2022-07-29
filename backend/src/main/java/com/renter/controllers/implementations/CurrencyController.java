package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.CurrencyAPI;
import com.renter.dto.response.CurrencyDto;
import com.renter.services.interfaces.CurrencyService;
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
@RequestMapping("/currencies")
@RequiredArgsConstructor
public class CurrencyController implements CurrencyAPI {

    private final CurrencyService currencyService;

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('currency:write')")
    public ResponseEntity<CurrencyDto> createCurrency(@RequestParam String name) {
        return new ResponseEntity<>(currencyService.createCurrency(name), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('currency:write')")
    public CurrencyDto updateCurrency(@PathVariable Long id, @RequestParam String name) {
        return currencyService.updateCurrency(id, name);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('currency:write')")
    public void deleteCurrency(@PathVariable Long id) {
        currencyService.deleteCurrency(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('currency:read')")
    public List<CurrencyDto> getAllCurrencies(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return currencyService.getAllCurrencies(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    @PreAuthorize("hasAuthority('currency:read')")
    public List<CurrencyDto> getAllCurrencies() {
        return currencyService.getAllCurrencies();
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('currency:read')")
    public CurrencyDto getCurrencyById(Long id) {
        return currencyService.getCurrencyById(id);
    }
}
