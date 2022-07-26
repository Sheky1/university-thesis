package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.AgencyAPI;
import com.renter.dto.request.AgencyRequestDto;
import com.renter.dto.response.AgencyDto;
import com.renter.services.interfaces.AgencyService;
import com.renter.utility.AgencyFields;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agencies")
@RequiredArgsConstructor
public class AgencyController implements AgencyAPI {

    private final AgencyService agencyService;

    @Override
    @PostMapping
    public ResponseEntity<AgencyDto> createAgency(@RequestBody AgencyRequestDto agencyRequestDto) {
        return new ResponseEntity<>(agencyService.createAgency(agencyRequestDto), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    public AgencyDto updateAgency(@PathVariable Long id, @RequestBody AgencyRequestDto agencyRequestDto) {
        return agencyService.updateAgency(id, agencyRequestDto);
    }

    @Override
    @DeleteMapping("/{id}")
    public void deleteAgency(@PathVariable Long id) {
        agencyService.deleteAgency(id);
    }

    @Override
    @GetMapping
    public List<AgencyDto> getAllAgencies(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") AgencyFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return agencyService.getAllAgencies(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    public List<AgencyDto> getAllAgencies() {
        return agencyService.getAllAgencies();
    }

    @Override
    @GetMapping("/{id}")
    public AgencyDto getAgencyById(@PathVariable Long id) {
        return agencyService.getAgencyById(id);
    }
}
