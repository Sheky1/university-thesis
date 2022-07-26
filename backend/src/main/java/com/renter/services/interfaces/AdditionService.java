package com.renter.services.interfaces;

import com.renter.dto.request.AdditionRequestDto;
import com.renter.dto.response.AdditionDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdditionService {

    AdditionDto createAddition(AdditionRequestDto additionRequestDto);
    AdditionDto updateAddition(Long id, AdditionRequestDto additionRequestDto);
    void deleteAddition(Long id);
    List<AdditionDto> getAllAdditions(Pageable pageable);
    List<AdditionDto> getAllAdditions();
    AdditionDto getAdditionById(Long id);

}
