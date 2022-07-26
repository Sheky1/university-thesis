package com.renter.controllers.implementations;

import com.renter.controllers.interfaces.AdditionAPI;
import com.renter.dto.request.AdditionRequestDto;
import com.renter.dto.response.AdditionDto;
import com.renter.services.interfaces.AdditionService;
import com.renter.utility.SimpleFields;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/additions")
@RequiredArgsConstructor
public class AdditionController implements AdditionAPI {

    private final AdditionService additionService;

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('addition:write')")
    public ResponseEntity<AdditionDto> createAddition(@RequestBody AdditionRequestDto additionRequestDto) {
        return new ResponseEntity<>(additionService.createAddition(additionRequestDto), HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('addition:write')")
    public AdditionDto updateAddition(@PathVariable Long id, @RequestBody AdditionRequestDto additionRequestDto) {
        return additionService.updateAddition(id, additionRequestDto);
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('addition:write')")
    public void deleteAddition(@PathVariable Long id) {
        additionService.deleteAddition(id);
    }

    @Override
    @GetMapping
    @PreAuthorize("hasAuthority('addition:read')")
    public List<AdditionDto> getAllAdditions(@RequestParam(defaultValue = "${pagination.page}") int page, @RequestParam(defaultValue = "${pagination.size}") int size, @RequestParam(defaultValue = "${sorting.field}") SimpleFields field, @RequestParam(defaultValue = "${sorting.direction}") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, field.getSort(direction));
        return additionService.getAllAdditions(pageable);
    }

    @Override
    @GetMapping("/unpaged")
    @PreAuthorize("hasAuthority('addition:read')")
    public List<AdditionDto> getAllAdditions() {
        return additionService.getAllAdditions();
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('addition:read')")
    public AdditionDto getAdditionById(@PathVariable Long id) {
        return additionService.getAdditionById(id);
    }
}
