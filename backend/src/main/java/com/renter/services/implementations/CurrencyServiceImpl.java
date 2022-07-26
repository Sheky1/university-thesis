package com.renter.services.implementations;

import com.renter.domain.CurrencyEntity;
import com.renter.dto.response.CurrencyDto;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.CurrencyMapper;
import com.renter.repositories.CurrencyRepository;
import com.renter.services.interfaces.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

    private final CurrencyMapper currencyMapper;
    private final CurrencyRepository currencyRepository;

    @Override
    public CurrencyDto createCurrency(String name) {
        if(currencyRepository.findByName(name).isPresent()) throw new UniqueValueException("Neophodno je uneti ime koje nije već u sistemu.");
        CurrencyEntity currencyEntity = currencyMapper.toEntity(name);
        return currencyMapper.toDto(currencyRepository.save(currencyEntity));
    }
}
