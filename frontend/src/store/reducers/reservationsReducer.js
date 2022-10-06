import * as actionTypes from "../actions/types";

const initialState = [];

const reservationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESERVATIONS:
            return action.payload;
        case actionTypes.UPDATE_RESERVATION:
            return [
                action.payload,
                ...state.filter(
                    (reservation) => reservation.id !== action.payload.id
                ),
            ];
        // case actionTypes.ADD_CURRENCY:
        //     return [...state, action.payload];
        // case actionTypes.DELETE_CURRENCY:
        //     return [
        //         ...state.filter((currency) => currency.id !== action.payload),
        //     ];
        default:
            return state;
    }
};

export default reservationsReducer;
