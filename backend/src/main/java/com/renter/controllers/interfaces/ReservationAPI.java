package com.renter.controllers.interfaces;

import com.renter.dto.request.ReservationRequestDto;
import com.renter.dto.response.ReservationDto;
import com.renter.utility.ReservationFields;
import com.renter.utility.SimpleFields;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@ApiResponses(value = {@ApiResponse(responseCode = "403", description = "You don't have the permission to access this endpoint.", content = @Content), @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
public interface ReservationAPI {

    @Operation(summary = "Create Reservation", description = "This endpoint is for creating a new Reservation object. ", tags = "Reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New Reservation created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReservationDto.class))}),
            @ApiResponse(responseCode = "512", description = "Reservation with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReservationDto.class))})})
    ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationRequestDto ReservationRequestDto);

    @Operation(summary = "Approve Reservation", description = "This endpoint is for approving a specific Reservation object. ", tags = "Reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReservationDto.class))}),
            @ApiResponse(responseCode = "404", description = "Reservation with the given id not found",
                    content = @Content)})
    ReservationDto approveReservation(@PathVariable Long id);

    @Operation(summary = "Complete Reservation", description = "This endpoint is for completing a specific Reservation object. ", tags = "Reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReservationDto.class))}),
            @ApiResponse(responseCode = "404", description = "Reservation with the given id not found",
                    content = @Content)})
    ReservationDto completeReservation(@PathVariable Long id);

    @Operation(summary = "Reject Reservation", description = "This endpoint is for rejecting a specific Reservation object. ", tags = "Reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReservationDto.class))}),
            @ApiResponse(responseCode = "404", description = "Reservation with the given id not found",
                    content = @Content)})
    ReservationDto rejectReservation(@PathVariable Long id);

    @Operation(summary = "Get Reservations", description = "This endpoint is for getting all available Reservations with pagination.", tags = "Reservation")
    @ApiResponse(responseCode = "200", description = "All Reservations found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = ReservationDto.class))})
    List<ReservationDto> getAllReservations(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") ReservationFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get Reservations", description = "This endpoint is for getting all available Reservations.", tags = "Reservation")
    @ApiResponse(responseCode = "200", description = "All Reservations found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = ReservationDto.class))})
    List<ReservationDto> getAllReservations();

    @Operation(summary = "Filter Reservations", description = "This endpoint is for filter all available Reservations.", tags = "Reservation")
    @ApiResponse(responseCode = "200", description = "All Reservations found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = ReservationDto.class))})
    List<ReservationDto> filterReservations(@RequestParam boolean isApproved, @RequestParam boolean isCompleted, @RequestParam boolean isRejected);

    @Operation(summary = "Get Reservation", description = "This endpoint is for getting specific Reservation object. ", tags = "Reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReservationDto.class))}),
            @ApiResponse(responseCode = "404", description = "Reservation with given id not found",
                    content = @Content)})
    ReservationDto getReservationById(@PathVariable Long id);
}
