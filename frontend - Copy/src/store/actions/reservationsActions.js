import { GET_RESERVATIONS, UPDATE_RESERVATION } from "./types";

export const getReservations = (reservations) => {
    return {
        type: GET_RESERVATIONS,
        payload: reservations,
    };
};

export const updateReservation = (reservation) => {
    return {
        type: UPDATE_RESERVATION,
        payload: reservation,
    };
};

// export const addCurrency = (currency) => {
//     return {
//         type: ADD_CURRENCY,
//         payload: currency,
//     };
// };

// export const deleteCurrency = (id) => {
//     return {
//         type: DELETE_CURRENCY,
//         payload: id,
//     };
// };
