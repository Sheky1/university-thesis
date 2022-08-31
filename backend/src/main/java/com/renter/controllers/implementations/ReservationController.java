package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.ReservationAPI;
import com.renter.dto.request.ReservationRequestDto;
import com.renter.dto.response.ReservationDto;
import com.renter.services.interfaces.ReservationService;
import com.renter.utility.ReservationFields;
import com.renter.utility.SimpleFields;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController implements ReservationAPI {

    private final ReservationService reservationService;

    @Override
    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationRequestDto reservationRequestDto) {
        return new ResponseEntity<>(reservationService.createReservation(reservationRequestDto), HttpStatus.OK);
    }

    @Override
    @PostMapping("/approve/{id}")
    public ReservationDto approveReservation(@PathVariable Long id) {
        return reservationService.approveReservation(id);
    }

    @Override
    @PostMapping("/complete/{id}")
    public ReservationDto completeReservation(@PathVariable Long id) {
        return reservationService.completeReservation(id);
    }

    @Override
    @PostMapping("/reject/{id}")
    public ReservationDto rejectReservation(@PathVariable Long id) {
        return reservationService.rejectReservation(id);
    }

    @Override
    @GetMapping
    public List<ReservationDto> getAllReservations(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") ReservationFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return reservationService.getAllReservations(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    public List<ReservationDto> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @Override
    @GetMapping("/filter")
    public List<ReservationDto> filterReservations(@RequestParam boolean isApproved, @RequestParam boolean isCompleted, @RequestParam boolean isRejected) {
        return reservationService.filterReservations(isApproved, isCompleted, isRejected);
    }


    @Override
    @GetMapping("{id}")
    public ReservationDto getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }
}
