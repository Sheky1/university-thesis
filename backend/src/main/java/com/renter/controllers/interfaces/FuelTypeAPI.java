package com.renter.controllers.interfaces;

import com.renter.dto.request.FuelTypeRequestDto;
import com.renter.dto.response.FuelTypeDto;
import com.renter.utility.SimpleFields;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@ApiResponses(value = {@ApiResponse(responseCode = "403", description = "You don't have the permission to access this endpoint.", content = @Content), @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
public interface FuelTypeAPI {

    @Operation(summary = "Create fuel type", description = "This endpoint is for creating a new fuel type object. ", tags = "Fuel type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New fuel type created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = FuelTypeDto.class))}),
            @ApiResponse(responseCode = "512", description = "Fuel type with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = FuelTypeDto.class))})})
    ResponseEntity<FuelTypeDto> createFuelType(FuelTypeRequestDto fuelTypeRequestDto);

    @Operation(summary = "Update fuel type", description = "This endpoint is for updating a specific fuel type object. ", tags = "Fuel type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fuel type successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = FuelTypeDto.class))}),
            @ApiResponse(responseCode = "404", description = "Fuel type with the given id not found",
                    content = @Content),
            @ApiResponse(responseCode = "512", description = "Fuel type with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = FuelTypeDto.class))})})
    FuelTypeDto updateFuelType(@PathVariable Long id, @RequestParam FuelTypeRequestDto fuelTypeRequestDto);

    @Operation(summary = "Delete fuel type", description = "This endpoint is for deleting a fuel type object. ", tags = "Fuel type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fuel type deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema())})})
    void deleteFuelType(Long id);

    @Operation(summary = "Get fuel types", description = "This endpoint is for getting all available fuel types with pagination.", tags = "Fuel type")
    @ApiResponse(responseCode = "200", description = "All fuel types found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = FuelTypeDto.class))})
    List<FuelTypeDto> getAllFuelTypes(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get fuel types", description = "This endpoint is for getting all available fuel types.", tags = "Fuel type")
    @ApiResponse(responseCode = "200", description = "All fuel types found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = FuelTypeDto.class))})
    List<FuelTypeDto> getAllFuelTypes();

    @Operation(summary = "Get fuel type", description = "This endpoint is for getting specific fuel type object. ", tags = "Fuel type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fuel type successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = FuelTypeDto.class))}),
            @ApiResponse(responseCode = "404", description = "Fuel type with given id not found",
                    content = @Content)})
    FuelTypeDto getFuelTypeById(@PathVariable Long id);
}
