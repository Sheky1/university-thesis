package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.AgencyAPI;
import com.renter.dto.request.AgencyRequestDto;
import com.renter.dto.response.AgencyDto;
import com.renter.dto.response.VehicleDto;
import com.renter.services.interfaces.AgencyService;
import com.renter.utility.AgencyFields;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/agencies")
@RequiredArgsConstructor
public class AgencyController implements AgencyAPI {

    private final AgencyService agencyService;

    @Override
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasAuthority('agency:write')")
    public ResponseEntity<AgencyDto> createAgency(@Valid AgencyRequestDto agencyRequestDto) {
        return new ResponseEntity<>(agencyService.createAgency(agencyRequestDto), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('agency:write')")
    public AgencyDto updateAgency(@PathVariable Long id, @RequestBody AgencyRequestDto agencyRequestDto) {
        return agencyService.updateAgency(id, agencyRequestDto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('agency:write')")
    public AgencyDto deleteAgency(@PathVariable Long id) {
        return agencyService.deleteAgency(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('agency:read')")
    public List<AgencyDto> getAllAgencies(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") AgencyFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return agencyService.getAllAgencies(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    @PreAuthorize("hasAuthority('agency:read')")
    public List<AgencyDto> getAllAgencies() {
        return agencyService.getAllAgencies();
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('agency:read')")
    public AgencyDto getAgencyById(@PathVariable Long id) {
        return agencyService.getAgencyById(id);
    }

    @Override
    @GetMapping("/{id}/vehicles")
    @PreAuthorize("hasAuthority('vehicle:read')")
    public List<VehicleDto> getVehiclesInAgency(@PathVariable Long id) {
        return agencyService.getVehiclesInAgency(id);
    }
}
