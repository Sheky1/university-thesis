package com.renter.controllers.interfaces;

import com.renter.dto.response.CurrencyDto;
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
public interface CurrencyAPI {

    @Operation(summary = "Create currency", description = "This endpoint is for creating a new currency object. ", tags = "Currency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New currency created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CurrencyDto.class))})})
    ResponseEntity<CurrencyDto> createCurrency(String name);

    @Operation(summary = "Update currency", description = "This endpoint is for updating a specific currency object. ", tags = "Currency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Currency successfully updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CurrencyDto.class))}),
            @ApiResponse(responseCode = "404", description = "Currency with the given id not found",
                    content = @Content),
            @ApiResponse(responseCode = "512", description = "Currency with given name already exists",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CurrencyDto.class))})})
    CurrencyDto updateCurrency(@PathVariable Long id, @RequestParam String name);

    @Operation(summary = "Delete currency", description = "This endpoint is for deleting a currency object. ", tags = "Currency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Currency deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema())})})
    void deleteCurrency(Long id);

    @Operation(summary = "Get currencies", description = "This endpoint is for getting all available currencies with pagination.", tags = "Currency")
    @ApiResponse(responseCode = "200", description = "All currencies found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CurrencyDto.class))})
    List<CurrencyDto> getAllCurrencies(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction);

    @Operation(summary = "Get currencies", description = "This endpoint is for getting all available currencies.", tags = "Currency")
    @ApiResponse(responseCode = "200", description = "All currencies found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = CurrencyDto.class))})
    List<CurrencyDto> getAllCurrencies();

    @Operation(summary = "Get currency", description = "This endpoint is for getting specific currency object. ", tags = "Currency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Currency successfully found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CurrencyDto.class))}),
            @ApiResponse(responseCode = "404", description = "Currency with given id not found",
                    content = @Content)})
    CurrencyDto getCurrencyById(@PathVariable Long id);

}
