package com.renter.services.implementations;

import com.renter.domain.AdditionEntity;
import com.renter.domain.AgencyEntity;
import com.renter.domain.CurrencyEntity;
import com.renter.domain.UserDomain;
import com.renter.dto.request.AdditionRequestDto;
import com.renter.dto.response.AdditionDto;
import com.renter.exceptions.NotFoundException;
import com.renter.mappers.AdditionMapper;
import com.renter.repositories.AdditionRepository;
import com.renter.repositories.AgencyRepository;
import com.renter.repositories.CurrencyRepository;
import com.renter.repositories.UserDomainRepository;
import com.renter.services.interfaces.AdditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdditionServiceImpl implements AdditionService {

    private final AdditionRepository additionRepository;
    private final CurrencyRepository currencyRepository;
    private final AdditionMapper additionMapper;
    private final UserDomainRepository userDomainRepository;

    @Override
    public AdditionDto createAddition(AdditionRequestDto additionRequestDto) {
        AdditionEntity additionEntity = additionMapper.toEntity(additionRequestDto);
        UserDomain userDomain = userDomainRepository.findById(additionRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("Traženi korisnik ne postoji."));
        CurrencyEntity currencyEntity = currencyRepository.findById(additionRequestDto.getCurrencyId()).orElseThrow(() -> new NotFoundException("Tražena valuta ne postoji."));
        additionEntity.setAgency(userDomain.getAgency());
        additionEntity.setCurrency(currencyEntity);
        return additionMapper.toDto(additionRepository.save(additionEntity));
    }

    @Override
    public AdditionDto updateAddition(Long id, AdditionRequestDto additionRequestDto) {
        AdditionEntity additionEntity = additionRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi dodatak ne postoji."));
        additionMapper.updateAddition(additionEntity, additionRequestDto);
        return additionMapper.toDto(additionRepository.save(additionEntity));
    }

    @Override
    @Transactional
    public void deleteAddition(Long id) {
        AdditionEntity additionEntity = additionRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi dodatak ne postoji."));
        additionRepository.delete(additionEntity);
    }

    @Override
    public List<AdditionDto> getAllAdditions(Pageable pageable) {
        return additionRepository.findAll(pageable).map(additionMapper::toDto).stream().toList();
    }

    @Override
    public List<AdditionDto> getAllAdditions() {
        return additionRepository.findAll().stream().map(additionMapper::toDto).toList();
    }

    @Override
    public AdditionDto getAdditionById(Long id) {
        return additionMapper.toDto(additionRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi dodatak ne postoji.")));
    }
}
