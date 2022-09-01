import * as actionTypes from "../actions/types";

const initialState = [];

const reservationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_REPORTS:
            return action.payload;
        case actionTypes.UPDATE_REPORT:
            return [
                ...state.filter((report) => report.id !== action.payload.id),
                action.payload,
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
