package com.renter.services.implementations;

import com.renter.domain.*;
import com.renter.dto.request.DateFilterDto;
import com.renter.dto.request.ReservationRequestDto;
import com.renter.dto.request.VehicleRequestDto;
import com.renter.dto.response.VehicleDto;
import com.renter.exceptions.NotFoundException;
import com.renter.mappers.VehicleMapper;
import com.renter.repositories.*;
import com.renter.services.interfaces.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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
    private final ImageRepository imageRepository;

    @Override
    @Transactional
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

        List<ImageEntity> images = vehicleRequestDto.getImages().stream().map(multipartFile -> {
            ImageEntity imageEntity = new ImageEntity();
            imageEntity.setVehicle(vehicleEntity);
            try {
                byte[] bytes = multipartFile.getBytes();
                Path path = Paths.get("D:\\Dimitrije\\Posao\\git\\renter-thesis\\renter-front-final\\src\\images\\uploaded\\" + multipartFile.getOriginalFilename());
                Files.write(path, bytes);
                imageEntity.setUrl(multipartFile.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
            }
            return imageEntity;
        }).toList();

        VehicleEntity newVehicle = vehicleRepository.save(vehicleEntity);
        vehicleEntity.setImages(images);
        imageRepository.saveAll(images);

        return vehicleMapper.toDto(newVehicle);
    }

    @Override
    public VehicleDto updateVehicle(Long id, VehicleRequestDto vehicleRequestDto) {
        VehicleEntity vehicleEntity = vehicleRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženo vozilo ne postoji."));
        vehicleMapper.updateVehicle(vehicleEntity, vehicleRequestDto);

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
        vehicleEntity.getAdditions().clear();
        vehicleEntity.getAdditions().addAll(additions);

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

    @Override
    public List<VehicleDto> filterVehiclesByDate(DateFilterDto dateFilterDto) {
        List<VehicleEntity> allVehicles = vehicleRepository.findAll();
        List<VehicleEntity> toReturn = new ArrayList<>();
        for (VehicleEntity vehicleEntity : allVehicles) {
            int flag = 0;
            for (ReservationEntity reservation : vehicleEntity.getReservations()) {
                if (datesIntersecting(reservation, dateFilterDto)) {
                    flag = 1;
                    break;
                }
            }
            if(flag == 0) toReturn.add(vehicleEntity);
        }
        return toReturn.stream().map(vehicleMapper::toDto).toList();
    }

    private boolean datesIntersecting(ReservationEntity reservation, DateFilterDto dateFilterDto) {
        return reservation.getTakingDate().isBefore(dateFilterDto.getTakingDate()) && reservation.getReturningDate().isAfter(dateFilterDto.getTakingDate()) ||
                reservation.getTakingDate().isBefore(dateFilterDto.getReturningDate()) && reservation.getReturningDate().isAfter(dateFilterDto.getReturningDate()) ||
                reservation.getTakingDate().isBefore(dateFilterDto.getTakingDate()) && reservation.getReturningDate().isAfter(dateFilterDto.getReturningDate()) ||
                reservation.getTakingDate().isAfter(dateFilterDto.getTakingDate()) && reservation.getReturningDate().isBefore(dateFilterDto.getReturningDate());
    }
}
