package com.renter.services.implementations;

import com.renter.domain.UserDomain;
import com.renter.domain.VehicleSizeEntity;
import com.renter.dto.request.FuelSizeRequestDto;
import com.renter.dto.response.VehicleSizeDto;
import com.renter.exceptions.NotFoundException;
import com.renter.exceptions.UniqueValueException;
import com.renter.mappers.VehicleSizeMapper;
import com.renter.repositories.AgencyRepository;
import com.renter.repositories.UserDomainRepository;
import com.renter.repositories.VehicleSizeRepository;
import com.renter.services.interfaces.VehicleSizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleSizeServiceImpl implements VehicleSizeService {

    private final VehicleSizeRepository vehicleSizeRepository;
    private final AgencyRepository agencyRepository;
    private final VehicleSizeMapper vehicleSizeMapper;
    private final UserDomainRepository userDomainRepository;

    @Override
    public VehicleSizeDto createVehicleSize(FuelSizeRequestDto fuelSizeRequestDto) {
        if (vehicleSizeRepository.findByName(fuelSizeRequestDto.getName()).isPresent())
            throw new UniqueValueException("Neophodno je uneti naziv koji nije već u sistemu.");
        VehicleSizeEntity vehicleSizeEntity = vehicleSizeMapper.toEntity(fuelSizeRequestDto.getName());
        UserDomain userDomain = userDomainRepository.findById(fuelSizeRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("Tražena korisnik ne postoji."));
        vehicleSizeEntity.setAgency(userDomain.getAgency());
        return vehicleSizeMapper.toDto(vehicleSizeRepository.save(vehicleSizeEntity));
    }

    @Override
    public VehicleSizeDto updateVehicleSize(Long id, FuelSizeRequestDto fuelSizeRequestDto) {
        VehicleSizeEntity vehicleSizeEntity = vehicleSizeRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena veličina vozila ne postoji."));
        vehicleSizeEntity.setName(fuelSizeRequestDto.getName());
        UserDomain userDomain = userDomainRepository.findById(fuelSizeRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("Tražena korisnik ne postoji."));
        vehicleSizeEntity.setAgency(userDomain.getAgency());
        return vehicleSizeMapper.toDto(vehicleSizeRepository.save(vehicleSizeEntity));
    }

    @Override
    public void deleteVehicleSize(Long id) {
        VehicleSizeEntity vehicleSizeEntity = vehicleSizeRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena veličina vozila ne postoji."));
        vehicleSizeRepository.delete(vehicleSizeEntity);
    }

    @Override
    public List<VehicleSizeDto> getAllVehicleSizes(Pageable pageable) {
        return vehicleSizeRepository.findAll(pageable).map(vehicleSizeMapper::toDto).stream().toList();
    }

    @Override
    public List<VehicleSizeDto> getAllVehicleSizes() {
        return vehicleSizeRepository.findAll().stream().map(vehicleSizeMapper::toDto).toList();
    }

    @Override
    public VehicleSizeDto getVehicleSizeById(Long id) {
        return vehicleSizeMapper.toDto(vehicleSizeRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena veličina vozila ne postoji.")));
    }
}
