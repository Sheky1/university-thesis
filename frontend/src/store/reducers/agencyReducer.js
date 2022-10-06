import * as actionTypes from "../actions/types";

const initialState = [];

const agencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_AGENCIES:
            return action.payload;
        case actionTypes.UPDATE_AGENCY:
            return [
                action.payload,
                ...state.filter((agency) => agency.id !== action.payload.id),
            ];
        case actionTypes.ADD_AGENCY:
            return [action.payload, ...state];
        case actionTypes.DELETE_AGENCY:
            return [...state.filter((agency) => agency.id !== action.payload)];
        default:
            return state;
    }
};

export default agencyReducer;
