package com.renter.services.interfaces;

import com.renter.dto.response.CurrencyDto;
import org.springframework.stereotype.Service;

@Service
public interface CurrencyService {

    CurrencyDto createCurrency(String name);

}
