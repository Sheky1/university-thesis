package com.renter.controllers.interfaces;

import com.renter.dto.request.FuelSizeRequestDto;
import com.renter.dto.response.FuelTypeDto;
import com.renter.dto.response.VehicleSizeDto;
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
public interface VehicleSizeAPI {

    @Operation(summary = "Create vehicle size", description = "This endpoint is for creating a new vehicle size object. ", tags = "Vehicle size")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New vehicle size created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleSizeDto.class))}),
            @ApiResponse(responseCode = "512", description = "Vehicle size with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleSizeDto.class))})})
    ResponseEntity<VehicleSizeDto> createVehicleSize(FuelSizeRequestDto fuelSizeRequestDto);

    @Operation(summary = "Update vehicle size", description = "This endpoint is for updating a specific vehicle size object. ", tags = "Vehicle size")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehicle size successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleSizeDto.class))}),
            @ApiResponse(responseCode = "404", description = "Vehicle size with the given id not found",
                    content = @Content),
            @ApiResponse(responseCode = "512", description = "Vehicle size with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleSizeDto.class))})})
    VehicleSizeDto updateVehicleSize(@PathVariable Long id, @RequestBody FuelSizeRequestDto fuelSizeRequestDto);

    @Operation(summary = "Delete vehicle size", description = "This endpoint is for deleting a vehicle size object. ", tags = "Vehicle size")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehicle size deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema())})})
    void deleteVehicleSize(Long id);

    @Operation(summary = "Get vehicle sizes", description = "This endpoint is for getting all available vehicle sizes with pagination.", tags = "Vehicle size")
    @ApiResponse(responseCode = "200", description = "All vehicle sizes found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = VehicleSizeDto.class))})
    List<VehicleSizeDto> getAllVehicleSize(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get vehicle sizes", description = "This endpoint is for getting all available vehicle sizes.", tags = "Vehicle size")
    @ApiResponse(responseCode = "200", description = "All vehicle sizes found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = VehicleSizeDto.class))})
    List<VehicleSizeDto> getAllVehicleSize();

    @Operation(summary = "Get vehicle size", description = "This endpoint is for getting specific vehicle size object. ", tags = "Vehicle size")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehicle size successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = VehicleSizeDto.class))}),
            @ApiResponse(responseCode = "404", description = "Vehicle size with given id not found",
                    content = @Content)})
    VehicleSizeDto getVehicleSizeById(@PathVariable Long id);
}
