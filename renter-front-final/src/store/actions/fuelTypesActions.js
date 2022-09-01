import {
    GET_FUEL_TYPES,
    UPDATE_FUEL_TYPE,
    ADD_FUEL_TYPE,
    DELETE_FUEL_TYPE,
} from "./types";

export const getFuelTypes = (fuelTypes) => {
    return {
        type: GET_FUEL_TYPES,
        payload: fuelTypes,
    };
};

export const updateFuelType = (fuelType) => {
    return {
        type: UPDATE_FUEL_TYPE,
        payload: fuelType,
    };
};

export const addFuelType = (fuelType) => {
    return {
        type: ADD_FUEL_TYPE,
        payload: fuelType,
    };
};

export const deleteFuelType = (id) => {
    return {
        type: DELETE_FUEL_TYPE,
        payload: id,
    };
};
