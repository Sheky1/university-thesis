import {
    GET_VEHICLES,
    UPDATE_VEHICLE,
    ADD_VEHICLE,
    DELETE_VEHICLE,
} from "./types";

export const getVehicles = (vehicles) => {
    return {
        type: GET_VEHICLES,
        payload: vehicles,
    };
};

export const updateVehicle = (vehicle) => {
    return {
        type: UPDATE_VEHICLE,
        payload: vehicle,
    };
};

export const addVehicle = (vehicle) => {
    return {
        type: ADD_VEHICLE,
        payload: vehicle,
    };
};

export const deleteVehicle = (id) => {
    return {
        type: DELETE_VEHICLE,
        payload: id,
    };
};
