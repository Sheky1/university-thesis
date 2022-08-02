package com.renter.services.implementations;

import com.renter.domain.FuelTypeEntity;
import com.renter.domain.UserDomain;
import com.renter.dto.request.FuelSizeRequestDto;
import com.renter.dto.response.FuelTypeDto;
import com.renter.exceptions.NotFoundException;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.FuelTypeMapper;
import com.renter.repositories.AgencyRepository;
import com.renter.repositories.FuelTypeRepository;
import com.renter.repositories.UserDomainRepository;
import com.renter.services.interfaces.FuelTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FuelTypeServiceImpl implements FuelTypeService {

    private final FuelTypeRepository fuelTypeRepository;
    private final AgencyRepository agencyRepository;
    private final FuelTypeMapper fuelTypeMapper;
    private final UserDomainRepository userDomainRepository;

    @Override
    public FuelTypeDto createFuelType(FuelSizeRequestDto fuelSizeRequestDto) {
        if (fuelTypeRepository.findByName(fuelSizeRequestDto.getName()).isPresent())
            throw new UniqueValueException("Neophodno je uneti naziv koji nije već u sistemu.");
        FuelTypeEntity fuelTypeEntity = fuelTypeMapper.toEntity(fuelSizeRequestDto.getName());
        UserDomain userDomain = userDomainRepository.findById(fuelSizeRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("Tražena korisnik ne postoji."));
        fuelTypeEntity.setAgency(userDomain.getAgency());
        return fuelTypeMapper.toDto(fuelTypeRepository.save(fuelTypeEntity));
    }

    @Override
    public FuelTypeDto updateFuelType(Long id, FuelSizeRequestDto fuelSizeRequestDto) {
        FuelTypeEntity fuelTypeEntity = fuelTypeRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi tip goriva ne postoji."));
        fuelTypeEntity.setName(fuelSizeRequestDto.getName());
        UserDomain userDomain = userDomainRepository.findById(fuelSizeRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("Tražena korisnik ne postoji."));
        fuelTypeEntity.setAgency(userDomain.getAgency());
        return fuelTypeMapper.toDto(fuelTypeRepository.save(fuelTypeEntity));
    }

    @Override
    public void deleteFuelType(Long id) {
        FuelTypeEntity fuelTypeEntity = fuelTypeRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi tip goriva ne postoji."));
        fuelTypeRepository.delete(fuelTypeEntity);
    }

    @Override
    public List<FuelTypeDto> getAllFuelTypes(Pageable pageable) {
        return fuelTypeRepository.findAll(pageable).map(fuelTypeMapper::toDto).stream().toList();
    }

    @Override
    public List<FuelTypeDto> getAllFuelTypes() {
        return fuelTypeRepository.findAll().stream().map(fuelTypeMapper::toDto).toList();
    }

    @Override
    public FuelTypeDto getFuelTypeById(Long id) {
        return fuelTypeMapper.toDto(fuelTypeRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi tip gorivo ne postoji.")));
    }
}
