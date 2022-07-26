package com.renter.services.implementations;

import com.renter.domain.CurrencyEntity;
import com.renter.dto.response.CurrencyDto;
import com.renter.exceptions.NotFoundException;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.CurrencyMapper;
import com.renter.repositories.CurrencyRepository;
import com.renter.services.interfaces.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

    private final CurrencyMapper currencyMapper;
    private final CurrencyRepository currencyRepository;

    @Override
    public CurrencyDto createCurrency(String name) {
        if(currencyRepository.findByName(name).isPresent()) throw new UniqueValueException("Neophodno je uneti naziv koji nije već u sistemu.");
        CurrencyEntity currencyEntity = currencyMapper.toEntity(name);
        return currencyMapper.toDto(currencyRepository.save(currencyEntity));
    }

    @Override
    public CurrencyDto updateCurrency(Long id, String name) {
        CurrencyEntity currencyEntity = currencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena valuta ne postoji."));
        currencyEntity.setName(name);
        return currencyMapper.toDto(currencyRepository.save(currencyEntity));
    }

    @Override
    public void deleteCurrency(Long id) {
        CurrencyEntity currencyEntity = currencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena valuta ne postoji."));
        currencyRepository.delete(currencyEntity);
    }

    @Override
    public List<CurrencyDto> getAllCurrencies(Pageable pageable) {
        return currencyRepository.findAll(pageable).map(currencyMapper::toDto).stream().toList();
    }

    @Override
    public List<CurrencyDto> getAllCurrencies() {
        return currencyRepository.findAll().stream().map(currencyMapper::toDto).toList();
    }

    @Override
    public CurrencyDto getCurrencyById(Long id) {
        return currencyMapper.toDto(currencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena valuta ne postoji.")));
    }
}
