package com.renter.services.interfaces;

import com.renter.dto.request.AgencyRequestDto;
import com.renter.dto.response.AgencyDto;
import com.renter.dto.response.VehicleDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AgencyService {

    AgencyDto createAgency(AgencyRequestDto agencyRequestDto);
    AgencyDto updateAgency(Long id, AgencyRequestDto agencyRequestDto);
    AgencyDto deleteAgency(Long id);
    List<AgencyDto> getAllAgencies(Pageable pageable);
    List<AgencyDto> getAllAgencies();
    AgencyDto getAgencyById(Long id);
    List<VehicleDto> getVehiclesInAgency(Long id);

}
