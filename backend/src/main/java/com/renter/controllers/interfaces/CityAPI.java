package com.renter.controllers.interfaces;

import com.renter.dto.response.CityDto;
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
public interface CityAPI {

    @Operation(summary = "Create city", description = "This endpoint is for creating a new city object. ", tags = "Cities")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New city created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CityDto.class))}),
            @ApiResponse(responseCode = "512", description = "City with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CityDto.class))})})
    ResponseEntity<CityDto> createCity(String name);

    @Operation(summary = "Update city", description = "This endpoint is for updating a specific city object. ", tags = "Cities")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "City successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CityDto.class))}),
            @ApiResponse(responseCode = "404", description = "City with the given id not found",
                    content = @Content),
            @ApiResponse(responseCode = "512", description = "City with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CityDto.class))})})
    CityDto updateCity(@PathVariable Long id, @RequestParam String name);

    @Operation(summary = "Delete city", description = "This endpoint is for deleting a city object. ", tags = "Cities")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "City deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema())})})
    void deleteCity(Long id);

    @Operation(summary = "Get cities", description = "This endpoint is for getting all available cities with pagination.", tags = "Cities")
    @ApiResponse(responseCode = "200", description = "All cities found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CityDto.class))})
    List<CityDto> getAllCities(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get cities", description = "This endpoint is for getting all available cities.", tags = "Cities")
    @ApiResponse(responseCode = "200", description = "All cities found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CityDto.class))})
    List<CityDto> getAllCities();

    @Operation(summary = "Get city", description = "This endpoint is for getting specific city object. ", tags = "Cities")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "City successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CityDto.class))}),
            @ApiResponse(responseCode = "404", description = "City with given id not found",
                    content = @Content)})
    CityDto getCityById(@PathVariable Long id);

}
