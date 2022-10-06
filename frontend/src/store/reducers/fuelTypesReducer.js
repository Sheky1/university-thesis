import * as actionTypes from "../actions/types";

const initialState = [];

const fuelTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_FUEL_TYPES:
            return action.payload;
        case actionTypes.UPDATE_FUEL_TYPE:
            return [
                action.payload,
                ...state.filter(
                    (fuelType) => fuelType.id !== action.payload.id
                ),
            ];
        case actionTypes.ADD_FUEL_TYPE:
            return [action.payload, ...state];
        case actionTypes.DELETE_FUEL_TYPE:
            return [
                ...state.filter((fuelType) => fuelType.id !== action.payload),
            ];
        default:
            return state;
    }
};

export default fuelTypesReducer;
