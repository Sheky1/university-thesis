import * as actionTypes from "../actions/types";

const initialState = [];

const vehicleSizesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SIZES:
            return action.payload;
        case actionTypes.UPDATE_SIZE:
            return [
                action.payload,
                ...state.filter((size) => size.id !== action.payload.id),
            ];
        case actionTypes.ADD_SIZE:
            return [action.payload, ...state];
        case actionTypes.DELETE_SIZE:
            return [...state.filter((size) => size.id !== action.payload)];
        default:
            return state;
    }
};

export default vehicleSizesReducer;
