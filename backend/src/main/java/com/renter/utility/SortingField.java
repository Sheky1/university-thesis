package com.renter.utility;

import org.springframework.data.domain.Sort;

public interface SortingField {

    String getField();

    default Sort getSort(Sort.Direction direction) {
        Sort sort = Sort.by(getField());
        return direction != null && direction.isDescending() ? sort.descending() : sort.ascending();
    }
}