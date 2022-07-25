import { GET_SIZES, UPDATE_SIZE, ADD_SIZE, DELETE_SIZE } from "./types";

export const getSizes = (sizes) => {
    return {
        type: GET_SIZES,
        payload: sizes,
    };
};

export const updateSize = (size) => {
    return {
        type: UPDATE_SIZE,
        payload: size,
    };
};

export const addSize = (size) => {
    return {
        type: ADD_SIZE,
        payload: size,
    };
};

export const deleteSize = (id) => {
    return {
        type: DELETE_SIZE,
        payload: id,
    };
};
