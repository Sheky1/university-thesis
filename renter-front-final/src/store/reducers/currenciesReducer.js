import * as actionTypes from "../actions/types";

const initialState = [];

const currenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENCIES:
            return action.payload;
        case actionTypes.UPDATE_CURRENCY:
            return [
                action.payload,
                ...state.filter(
                    (currency) => currency.id !== action.payload.id
                ),
            ];
        case actionTypes.ADD_CURRENCY:
            return [action.payload, ...state];
        case actionTypes.DELETE_CURRENCY:
            return [
                ...state.filter((currency) => currency.id !== action.payload),
            ];
        default:
            return state;
    }
};

export default currenciesReducer;
