import {
    GET_CURRENCIES,
    UPDATE_CURRENCY,
    ADD_CURRENCY,
    DELETE_CURRENCY,
} from "./types";

export const getCurrencies = (currencies) => {
    return {
        type: GET_CURRENCIES,
        payload: currencies,
    };
};

export const updateCurrency = (currency) => {
    return {
        type: UPDATE_CURRENCY,
        payload: currency,
    };
};

export const addCurrency = (currency) => {
    return {
        type: ADD_CURRENCY,
        payload: currency,
    };
};

export const deleteCurrency = (id) => {
    return {
        type: DELETE_CURRENCY,
        payload: id,
    };
};
