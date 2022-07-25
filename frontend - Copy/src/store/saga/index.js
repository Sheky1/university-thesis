import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/types";
import { login, logout, getUser } from "./login";

export function* watchLogin() {
    yield takeEvery(actionTypes.INITIATE_LOGIN, login);
    yield takeEvery(actionTypes.LOGOUT_USER, logout);
    yield takeEvery(actionTypes.GET_USER, getUser);
}
