package com.renter.controllers.interfaces;

import com.renter.dto.response.CityDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;

@ApiResponses(value = {@ApiResponse(responseCode = "403", description = "You don't have the permission to access this endpoint.", content = @Content), @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
public interface CityAPI {

    @Operation(summary = "Create city", description = "This endpoint is for creating a new city object. ", tags = "City")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New city created",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = CityDto.class))})})
    ResponseEntity<CityDto> createCity(String name);

}
