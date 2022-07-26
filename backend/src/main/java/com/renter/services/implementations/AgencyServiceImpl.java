package com.renter.services.implementations;

import com.renter.domain.AgencyEntity;
import com.renter.domain.CityEntity;
import com.renter.dto.request.AgencyRequestDto;
import com.renter.dto.response.AgencyDto;
import com.renter.exceptions.NotFoundException;
import com.renter.mappers.AgencyMapper;
import com.renter.repositories.*;
import com.renter.services.interfaces.AgencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AgencyServiceImpl implements AgencyService {

    private final AgencyRepository agencyRepository;
    private final AdditionRepository additionRepository;
    private final FuelTypeRepository fuelTypeRepository;
    private final VehicleSizeRepository vehicleSizeRepository;
    private final CityRepository cityRepository;
    private final AgencyMapper agencyMapper;

    @Override
    public AgencyDto createAgency(AgencyRequestDto agencyRequestDto) {
        AgencyEntity agencyEntity = agencyMapper.toEntity(agencyRequestDto);
        CityEntity cityEntity = cityRepository.findById(agencyRequestDto.getCityId()).orElseThrow(() -> new NotFoundException("Traženi grad ne postoji."));
        agencyEntity.setCity(cityEntity);
        return agencyMapper.toDto(agencyRepository.save(agencyEntity));
    }

    @Override
    public AgencyDto updateAgency(Long id, AgencyRequestDto agencyRequestDto) {
        AgencyEntity agencyEntity = agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena agencija ne postoji."));
        agencyMapper.updateAgency(agencyEntity, agencyRequestDto);
        return agencyMapper.toDto(agencyRepository.save(agencyEntity));
    }

    @Override
    public void deleteAgency(Long id) {
        AgencyEntity agencyEntity = agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena agencija ne postoji."));
        additionRepository.deleteAll(agencyEntity.getAdditions());
        fuelTypeRepository.deleteAll(agencyEntity.getFuelTypes());
        vehicleSizeRepository.deleteAll(agencyEntity.getVehicleSizes());
        agencyRepository.delete(agencyEntity);
    }

    @Override
    public List<AgencyDto> getAllAgencies(Pageable pageable) {
        return agencyRepository.findAll(pageable).map(agencyMapper::toDto).stream().toList();
    }

    @Override
    public List<AgencyDto> getAllAgencies() {
        return agencyRepository.findAll().stream().map(agencyMapper::toDto).toList();
    }

    @Override
    public AgencyDto getAgencyById(Long id) {
        return agencyMapper.toDto(agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena agencija ne postoji.")));
    }
}
