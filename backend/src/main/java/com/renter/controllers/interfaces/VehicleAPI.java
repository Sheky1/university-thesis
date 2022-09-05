package com.renter.controllers.interfaces;

import com.renter.dto.request.DateFilterDto;
import com.renter.dto.request.VehicleRequestDto;
import com.renter.dto.response.ReservationDto;
import com.renter.dto.response.VehicleDto;
import com.renter.utility.VehicleFields;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@ApiResponses(value = {@ApiResponse(responseCode = "403", description = "You don't have the permission to access this endpoint.", content = @Content), @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
public interface VehicleAPI {

    @Operation(summary = "Create vehicle", description = "This endpoint is for creating a new vehicle object. ", tags = "Vehicle")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New vehicle created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleDto.class))})})
    ResponseEntity<VehicleDto> createVehicle(VehicleRequestDto vehicleRequestDto);

    @Operation(summary = "Update vehicle", description = "This endpoint is for updating a specific vehicle object. ", tags = "Vehicle")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehicle successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleDto.class))}),
            @ApiResponse(responseCode = "404", description = "Vehicle with the given id not found",
                    content = @Content),
            @ApiResponse(responseCode = "512", description = "Vehicle with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleDto.class))})})
    VehicleDto updateVehicle(@PathVariable Long id, @RequestBody VehicleRequestDto vehicleRequestDto);

    @Operation(summary = "Delete vehicle", description = "This endpoint is for deleting a vehicle object. ", tags = "Vehicle")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehicle deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema())})})
    void deleteVehicle(Long id);

    @Operation(summary = "Get vehicles", description = "This endpoint is for getting all available vehicles with pagination.", tags = "Vehicle")
    @ApiResponse(responseCode = "200", description = "All vehicles found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = VehicleDto.class))})
    List<VehicleDto> getAllVehicles(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") VehicleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get vehicles", description = "This endpoint is for getting all available vehicles.", tags = "Vehicle")
    @ApiResponse(responseCode = "200", description = "All vehicles found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = VehicleDto.class))})
    List<VehicleDto> getAllVehicles();

    @Operation(summary = "Get vehicle", description = "This endpoint is for getting specific vehicle object. ", tags = "Vehicle")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehicle successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleDto.class))}),
            @ApiResponse(responseCode = "404", description = "Vehicle with given id not found",
                    content = @Content)})
    VehicleDto getVehicleById(@PathVariable Long id);

    @Operation(summary = "Get vehicles by reservation date", description = "This endpoint is for getting vehicles by reservation date. ", tags = "Vehicle")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehicles successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleDto.class))})})
    List<VehicleDto> filterVehiclesByDate(@RequestBody DateFilterDto dateFilterDto);
}
