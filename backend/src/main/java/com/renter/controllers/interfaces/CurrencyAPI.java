package com.renter.controllers.interfaces;

import com.renter.dto.response.CurrencyDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;

@ApiResponses(value = {@ApiResponse(responseCode = "403", description = "You don't have the permission to access this endpoint.", content = @Content), @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
public interface CurrencyAPI {

    @Operation(summary = "Create currency", description = "This endpoint is for creating a new currency object. ", tags = "Currency")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New currency created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CurrencyDto.class))})})
    ResponseEntity<CurrencyDto> createCurrency(String name);

}
