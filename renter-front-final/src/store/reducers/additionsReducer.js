import * as actionTypes from "../actions/types";

const initialState = [];

const additionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ADDITIONS:
            return action.payload;
        case actionTypes.UPDATE_ADDITION:
            return [
                action.payload,
                ...state.filter(
                    (addition) => addition.id !== action.payload.id
                ),
            ];
        case actionTypes.ADD_ADDITION:
            return [action.payload, ...state];
        case actionTypes.DELETE_ADDITION:
            return [
                ...state.filter((addition) => addition.id !== action.payload),
            ];
        default:
            return state;
    }
};

export default additionsReducer;
