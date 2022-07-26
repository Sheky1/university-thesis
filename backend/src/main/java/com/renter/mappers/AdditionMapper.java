package com.renter.mappers;

import com.renter.domain.AdditionEntity;
import com.renter.dto.request.AdditionRequestDto;
import com.renter.dto.response.AdditionDto;
import org.springframework.stereotype.Component;

@Component
public class AdditionMapper {

    public AdditionEntity toEntity(AdditionRequestDto additionRequestDto) {
        AdditionEntity additionEntity = new AdditionEntity();
        additionEntity.setName(additionRequestDto.getName());
        additionEntity.setPrice(additionRequestDto.getPrice());
        return additionEntity;
    }

    public AdditionDto toDto(AdditionEntity additionEntity) {
        AdditionDto additionDto = new AdditionDto();
        additionDto.setId(additionEntity.getId());
        additionDto.setName(additionEntity.getName());
        additionDto.setPrice(additionEntity.getPrice());
        additionDto.setCreatedDate(additionEntity.getCreatedDate());
        additionDto.setLastModifiedDate(additionEntity.getLastModifiedDate());
        additionDto.setVersion(additionEntity.getVersion());
        return additionDto;
    }

}