import * as actionTypes from "../actions/types";

const initialState = [];

const vehicleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_VEHICLES:
            return action.payload;
        case actionTypes.UPDATE_VEHICLE:
            return [
                action.payload,
                ...state.filter((vehicle) => vehicle.id !== action.payload.id),
            ];
        case actionTypes.ADD_VEHICLE:
            return [...state, action.payload];
        case actionTypes.DELETE_VEHICLE:
            return [
                ...state.filter((vehicle) => vehicle.id !== action.payload),
            ];
        default:
            return state;
    }
};

export default vehicleReducer;
