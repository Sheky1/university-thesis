package com.renter.services.implementations;

import com.renter.domain.AgencyEntity;
import com.renter.domain.ReservationEntity;
import com.renter.domain.UserDomain;
import com.renter.domain.VehicleEntity;
import com.renter.dto.request.ReservationRequestDto;
import com.renter.dto.response.ReservationDto;
import com.renter.exceptions.NotFoundException;
import com.renter.mappers.ResevationMapper;
import com.renter.repositories.AgencyRepository;
import com.renter.repositories.ReservationRepository;
import com.renter.repositories.UserDomainRepository;
import com.renter.repositories.VehicleRepository;
import com.renter.services.interfaces.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserDomainRepository userDomainRepository;
    private final VehicleRepository vehicleRepository;
    private final AgencyRepository agencyRepository;
    private final ResevationMapper resevationMapper;

    @Override
    public ReservationDto createReservation(ReservationRequestDto reservationRequestDto) {
        VehicleEntity vehicleEntity = vehicleRepository
                .findById(reservationRequestDto.getVehicleId())
                .orElseThrow(() -> new NotFoundException("Traženo vozilo ne postoji."));
        AgencyEntity agencyEntity = agencyRepository
                .findById(reservationRequestDto.getAgencyId())
                .orElseThrow(() -> new NotFoundException("Tražena agencija ne postoji."));
        UserDomain userDomain = userDomainRepository
                .findById(reservationRequestDto.getUserId())
                .orElseThrow(() -> new NotFoundException("Traženi korisnik ne postoji."));

        ReservationEntity reservationEntity = resevationMapper.toEntity(reservationRequestDto);
        reservationEntity.setVehicle(vehicleEntity);
        reservationEntity.setAgency(agencyEntity);
        reservationEntity.setUser(userDomain);
        return resevationMapper.toDto(reservationRepository.save(reservationEntity));
    }

    @Override
    public ReservationDto approveReservation(Long id) {
        ReservationEntity reservationEntity = reservationRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Tražena rezervacija ne postoji."));
        reservationEntity.setApproved(true);
        return resevationMapper.toDto(reservationRepository.save(reservationEntity));
    }

    @Override
    public ReservationDto completeReservation(Long id) {
        ReservationEntity reservationEntity = reservationRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Tražena rezervacija ne postoji."));
        reservationEntity.setCompleted(true);
        return resevationMapper.toDto(reservationRepository.save(reservationEntity));
    }

    @Override
    public ReservationDto rejectReservation(Long id) {
        ReservationEntity reservationEntity = reservationRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Tražena rezervacija ne postoji."));
        reservationEntity.setRejected(true);
        return resevationMapper.toDto(reservationRepository.save(reservationEntity));
    }

    @Override
    public List<ReservationDto> getAllReservations(Pageable pageable) {
        return reservationRepository.findAll(pageable).map(resevationMapper::toDto).stream().toList();
    }

    @Override
    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream().map(resevationMapper::toDto).toList();
    }

    @Override
    public List<ReservationDto> filterReservations(boolean isApproved, boolean isCompleted, boolean isRejected) {
        List<ReservationEntity> reservations = reservationRepository.findAll();
        List<ReservationEntity> toReturn = new ArrayList<>();
        for (ReservationEntity reservationEntity : reservations) {
            if (isApproved && reservationEntity.getApproved() && !reservationEntity.getCompleted()) toReturn.add(reservationEntity);
            else if (isCompleted && reservationEntity.getCompleted()) toReturn.add(reservationEntity);
            else if (isRejected && reservationEntity.getRejected()) toReturn.add(reservationEntity);
            else if (!isApproved && !isCompleted && !isRejected &&
                    !reservationEntity.getApproved() && !reservationEntity.getCompleted() && !reservationEntity.getRejected()) toReturn.add(reservationEntity);
        }
        return toReturn.stream().map(resevationMapper::toDto).toList();
    }

    @Override
    public ReservationDto getReservationById(Long id) {
        return resevationMapper.toDto(reservationRepository.findById(id).orElseThrow(() -> new NotFoundException("Tražena rezervacija ne postoji.")));
    }

    @Override
    public List<ReservationDto> getAgencyReservations(Long id) {
        if(agencyRepository.findById(id).isEmpty()) throw new NotFoundException("Tražena agencija ne postoji.");
        return reservationRepository.findReservationEntitiesByAgency_Id(id).stream().map(resevationMapper::toDto).toList();
    }

    @Override
    public List<ReservationDto> getVehicleReservations(Long id) {
        if(vehicleRepository.findById(id).isEmpty()) throw new NotFoundException("Traženo vozilo ne postoji.");
        return reservationRepository.findReservationEntitiesByVehicle_Id(id).stream().map(resevationMapper::toDto).toList();
    }

    @Override
    public List<ReservationDto> getAgencyReservationsByUser(Long id) {
        UserDomain user = userDomainRepository.findById(id).orElseThrow(() -> new NotFoundException("Traženi korisnik ne postoji."));
        return reservationRepository.findReservationEntitiesByAgency_Id(user.getAgency().getId()).stream().map(resevationMapper::toDto).toList();
    }
}
