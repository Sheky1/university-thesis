package com.renter.mappers;

import com.renter.domain.CurrencyEntity;
import com.renter.dto.response.CurrencyDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CurrencyMapper {

    public CurrencyEntity toEntity(String name) {
        CurrencyEntity currencyEntity = new CurrencyEntity();
        currencyEntity.setName(name);
        currencyEntity.setAdditions(new ArrayList<>());
        currencyEntity.setVehicles(new ArrayList<>());
        return currencyEntity;
    }

    public CurrencyDto toDto(CurrencyEntity currencyEntity) {
        CurrencyDto currencyDto = new CurrencyDto();
        currencyDto.setId(currencyEntity.getId());
        currencyDto.setName(currencyEntity.getName());
        currencyDto.setCreatedDate(currencyEntity.getCreatedDate());
        currencyDto.setLastModifiedDate(currencyEntity.getLastModifiedDate());
        currencyDto.setVersion(currencyEntity.getVersion());
        return currencyDto;
    }
}
