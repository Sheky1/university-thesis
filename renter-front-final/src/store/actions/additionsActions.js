import {
    GET_ADDITIONS,
    UPDATE_ADDITION,
    ADD_ADDITION,
    DELETE_ADDITION,
} from "./types";

export const getAdditions = (additions) => {
    return {
        type: GET_ADDITIONS,
        payload: additions,
    };
};

export const updateAddition = (addition) => {
    return {
        type: UPDATE_ADDITION,
        payload: addition,
    };
};

export const addAddition = (addition) => {
    return {
        type: ADD_ADDITION,
        payload: addition,
    };
};

export const deleteAddition = (id) => {
    return {
        type: DELETE_ADDITION,
        payload: id,
    };
};
