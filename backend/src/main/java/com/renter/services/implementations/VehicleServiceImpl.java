package com.renter.services.implementations;

import com.renter.domain.*;
import com.renter.dto.request.VehicleRequestDto;
import com.renter.dto.response.VehicleDto;
import com.renter.exceptions.NotFoundException;
import com.renter.mappers.VehicleMapper;
import com.renter.repositories.*;
import com.renter.services.interfaces.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleSizeRepository vehicleSizeRepository;
    private final FuelTypeRepository fuelTypeRepository;
    private final CurrencyRepository currencyRepository;
    private final AdditionRepository additionRepository;
    private final AgencyRepository agencyRepository;
    private final VehicleMapper vehicleMapper;
    private final UserDomainRepository userDomainRepository;

    @Override
    public VehicleDto createVehicle(VehicleRequestDto vehicleRequestDto) {
        VehicleEntity vehicleEntity = vehicleMapper.toEntity(vehicleRequestDto);

        VehicleSizeEntity vehicleSizeEntity = vehicleSizeRepository
                .findById(vehicleRequestDto.getVehicleSizeId())
                .orElseThrow(() -> new NotFoundException("Tražena veličina vozila ne postoji."));
        FuelTypeEntity fuelTypeEntity = fuelTypeRepository
                .findById(vehicleRequestDto.getFuelTypeId())
                .orElseThrow(() -> new NotFoundException("Traženi tip goriva ne postoji."));
        CurrencyEntity currencyEntity = currencyRepository
                .findById(vehicleRequestDto.getCurrencyId())
                .orElseThrow(() -> new NotFoundException("Tražena valuta ne postoji."));
        UserDomain userDomain = userDomainRepository
                .findById(vehicleRequestDto.getUserId())
                .orElseThrow(() -> new NotFoundException("Traženi korisnik ne postoji."));
        List<AdditionEntity> additions = vehicleRequestDto.getAdditionIds().stream()
                .map(additionId -> additionRepository.findById(additionId).orElseThrow(() -> new NotFoundException("Traženi dodatak ne postoji.")))
                .toList();

        vehicleEntity.setVehicleSize(vehicleSizeEntity);
        vehicleEntity.setFuelType(fuelTypeEntity);
        vehicleEntity.setCurrency(currencyEntity);
        vehicleEntity.setAgency(userDomain.getAgency());
        vehicleEntity.setAdditions(additions);

        return vehicleMapper.toDto(vehicleRepository.save(vehicleEntity));
    }

    @Override
    public VehicleDto updateVehicle(Long id, VehicleRequestDto vehicleRequestDto) {
        VehicleEntity vehicleEntity = vehicleRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženo vozilo ne postoji."));
        vehicleMapper.updateVehicle(vehicleEntity, vehicleRequestDto);
        return vehicleMapper.toDto(vehicleRepository.save(vehicleEntity));
    }

    @Override
    public void deleteVehicle(Long id) {
        VehicleEntity vehicleEntity = vehicleRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženo vozilo ne postoji."));
        vehicleRepository.delete(vehicleEntity);
    }

    @Override
    public List<VehicleDto> getAllVehicles(Pageable pageable) {
        return vehicleRepository.findAll(pageable).map(vehicleMapper::toDto).stream().toList();
    }

    @Override
    public List<VehicleDto> getAllVehicles() {
        return vehicleRepository.findAll().stream().map(vehicleMapper::toDto).toList();
    }

    @Override
    public VehicleDto getVehicleById(Long id) {
        return vehicleMapper.toDto(vehicleRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženo vozilo ne postoji.")));
    }
}
