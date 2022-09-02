package com.renter.services.interfaces;

import com.renter.dto.request.ReservationRequestDto;
import com.renter.dto.response.ReservationDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {

    ReservationDto createReservation(ReservationRequestDto reservationRequestDto);
    ReservationDto approveReservation(Long id);
    ReservationDto completeReservation(Long id);
    ReservationDto rejectReservation(Long id);
    List<ReservationDto> getAllReservations(Pageable pageable);
    List<ReservationDto> getAllReservations();
    List<ReservationDto> filterReservations(boolean isApproved, boolean isCompleted, boolean isRejected);
    ReservationDto getReservationById(Long id);
    List<ReservationDto> getAgencyReservations(Long id);
    List<ReservationDto> getVehicleReservations(Long id);
    List<ReservationDto> getAgencyReservationsByUser(Long id);

}
