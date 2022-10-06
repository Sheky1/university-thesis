package com.renter.controllers.interfaces;

import com.renter.dto.request.AdditionRequestDto;
import com.renter.dto.response.AdditionDto;
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
public interface AdditionAPI {

    @Operation(summary = "Create addition", description = "This endpoint is for creating a new addition object. ", tags = "Additions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New addition created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AdditionDto.class))}),
            @ApiResponse(responseCode = "512", description = "Addition with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AdditionDto.class))})})
    ResponseEntity<AdditionDto> createAddition(@RequestBody AdditionRequestDto additionRequestDto);

    @Operation(summary = "Update addition", description = "This endpoint is for updating a specific addition object. ", tags = "Additions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Addition successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AdditionDto.class))}),
            @ApiResponse(responseCode = "404", description = "Addition with the given id not found",
                    content = @Content),
            @ApiResponse(responseCode = "512", description = "Addition with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AdditionDto.class))})})
    AdditionDto updateAddition(@PathVariable Long id, @RequestBody AdditionRequestDto additionRequestDto);

    @Operation(summary = "Delete addition", description = "This endpoint is for deleting a addition object. ", tags = "Additions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Addition deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema())})})
    void deleteAddition(Long id);

    @Operation(summary = "Get additions", description = "This endpoint is for getting all available additions with pagination.", tags = "Additions")
    @ApiResponse(responseCode = "200", description = "All additions found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = AdditionDto.class))})
    List<AdditionDto> getAllAdditions(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get additions", description = "This endpoint is for getting all available additions.", tags = "Additions")
    @ApiResponse(responseCode = "200", description = "All additions found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = AdditionDto.class))})
    List<AdditionDto> getAllAdditions();

    @Operation(summary = "Get addition", description = "This endpoint is for getting specific addition object. ", tags = "Additions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Addition successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = AdditionDto.class))}),
            @ApiResponse(responseCode = "404", description = "Addition with given id not found",
                    content = @Content)})
    AdditionDto getAdditionById(@PathVariable Long id);
}
