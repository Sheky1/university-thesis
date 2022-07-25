import * as actionTypes from "../actions/types";

const initialState = {
    isLogged: false,
    loggedUser: {},
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return action.payload;
        default:
            return state;
    }
};

export default loginReducer;
