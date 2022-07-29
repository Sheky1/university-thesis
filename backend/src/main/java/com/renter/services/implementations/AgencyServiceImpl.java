package com.renter.services.implementations;

import com.renter.domain.AgencyEntity;
import com.renter.domain.CityEntity;
import com.renter.domain.UserDomain;
import com.renter.dto.request.AgencyRequestDto;
import com.renter.dto.response.AgencyDto;
import com.renter.exceptions.NotFoundException;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.AgencyMapper;
import com.renter.mappers.UserMapper;
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
    private final UserDomainRepository userDomainRepository;
    private final RoleRepository roleRepository;
    private final CityRepository cityRepository;
    private final AgencyMapper agencyMapper;
    private final UserMapper userMapper;

    @Override
    public AgencyDto createAgency(AgencyRequestDto agencyRequestDto) {
        if (userDomainRepository.findByUsername(agencyRequestDto.getUsername()).isPresent())
            throw new UniqueValueException("Korisnik sa zadatim korisničkim imenom već postoji.");
        if (userDomainRepository.findByEmail(agencyRequestDto.getEmail()).isPresent())
            throw new UniqueValueException("Korisnik sa zadatim e-mailom već postoji.");
        AgencyEntity agencyEntity = agencyMapper.toEntity(agencyRequestDto);
        CityEntity cityEntity = cityRepository.findById(agencyRequestDto.getCityId()).orElseThrow(() -> new NotFoundException("Traženi grad ne postoji."));
        agencyEntity.setCity(cityEntity);
        AgencyEntity newAgency = agencyRepository.save(agencyEntity);
        UserDomain user = userMapper.toEntity(agencyRequestDto);
        user.setAgency(newAgency);
        user.setRole(roleRepository.findByName("AGENCY").orElseThrow(() -> new NotFoundException("Tražena uloga ne postoji")));
        UserDomain newUser = userDomainRepository.save(user);
        newAgency.setUser(newUser);
        AgencyEntity agencyToReturn = agencyRepository.save(newAgency);
        return agencyMapper.toDto(agencyToReturn);
    }

    @Override
    public AgencyDto updateAgency(Long id, AgencyRequestDto agencyRequestDto) {
        AgencyEntity agencyEntity = agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena agencija ne postoji."));
        agencyMapper.updateAgency(agencyEntity, agencyRequestDto);
        UserDomain user = agencyEntity.getUser();
        userMapper.updateUser(user, agencyRequestDto);
        userDomainRepository.save(user);
        return agencyMapper.toDto(agencyRepository.save(agencyEntity));
    }

    @Override
    public AgencyDto deleteAgency(Long id) {
        AgencyEntity agencyEntity = agencyRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena agencija ne postoji."));
        additionRepository.deleteAll(agencyEntity.getAdditions());
        fuelTypeRepository.deleteAll(agencyEntity.getFuelTypes());
        vehicleSizeRepository.deleteAll(agencyEntity.getVehicleSizes());
        agencyRepository.delete(agencyEntity);
        return agencyMapper.toDto(agencyEntity);
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
