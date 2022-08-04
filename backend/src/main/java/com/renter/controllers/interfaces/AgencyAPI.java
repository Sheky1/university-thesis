package com.renter.controllers.interfaces;

import com.renter.dto.request.AgencyRequestDto;
import com.renter.dto.response.AgencyDto;
import com.renter.dto.response.VehicleDto;
import com.renter.utility.AgencyFields;
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

import javax.validation.Valid;
import java.util.List;

@ApiResponses(value = {@ApiResponse(responseCode = "403", description = "You don't have the permission to access this endpoint.", content = @Content), @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
public interface AgencyAPI {

    @Operation(summary = "Create agency", description = "This endpoint is for creating a new agency object. ", tags = "Agency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New agency created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AgencyDto.class))})})
    ResponseEntity<AgencyDto> createAgency(@Valid AgencyRequestDto agencyRequestDto);

    @Operation(summary = "Update agency", description = "This endpoint is for updating a specific agency object. ", tags = "Agency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AgencyDto.class))}),
            @ApiResponse(responseCode = "404", description = "Agency with the given id not found",
                    content = @Content),
            @ApiResponse(responseCode = "512", description = "Agency with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AgencyDto.class))})})
    AgencyDto updateAgency(@PathVariable Long id, @RequestBody AgencyRequestDto agencyRequestDto);

    @Operation(summary = "Delete agency", description = "This endpoint is for deleting a agency object. ", tags = "Agency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema())})})
    AgencyDto deleteAgency(Long id);

    @Operation(summary = "Get agencies", description = "This endpoint is for getting all available agencies with pagination.", tags = "Agency")
    @ApiResponse(responseCode = "200", description = "All agencies found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = AgencyDto.class))})
    List<AgencyDto> getAllAgencies(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") AgencyFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get agencies", description = "This endpoint is for getting all available agencies.", tags = "Agency")
    @ApiResponse(responseCode = "200", description = "All agencies found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = AgencyDto.class))})
    List<AgencyDto> getAllAgencies();

    @Operation(summary = "Get agency", description = "This endpoint is for getting specific agency object. ", tags = "Agency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AgencyDto.class))}),
            @ApiResponse(responseCode = "404", description = "Agency with given id not found",
                    content = @Content)})
    AgencyDto getAgencyById(@PathVariable Long id);

    @Operation(summary = "Get vehicles", description = "This endpoint is for getting specific agency object. ", tags = "Agency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AgencyDto.class))}),
            @ApiResponse(responseCode = "404", description = "Agency with given id not found",
                    content = @Content)})
    List<VehicleDto> getVehiclesInAgency(@PathVariable Long id);
}
