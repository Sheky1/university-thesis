package com.renter.services.interfaces;

import com.renter.dto.response.CurrencyDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CurrencyService {

    CurrencyDto createCurrency(String name);
    CurrencyDto updateCurrency(Long id, String name);
    void deleteCurrency(Long id);
    List<CurrencyDto> getAllCurrencies(Pageable pageable);
    List<CurrencyDto> getAllCurrencies();
    CurrencyDto getCurrencyById(Long id);

}
