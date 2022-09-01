import { GET_AGENCIES, UPDATE_AGENCY, ADD_AGENCY, DELETE_AGENCY } from "./types";

export const getAgencies = (agencies) => {
    return {
        type: GET_AGENCIES,
        payload: agencies,
    };
};

export const updateAgency = (agency) => {
    return {
        type: UPDATE_AGENCY,
        payload: agency,
    };
};

export const addAgency = (agency) => {
    return {
        type: ADD_AGENCY,
        payload: agency,
    };
};

export const deleteAgency = (id) => {
    return {
        type: DELETE_AGENCY,
        payload: id,
    };
};
