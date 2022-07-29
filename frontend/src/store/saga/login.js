import { put } from "redux-saga/effects";
import { api_axios } from "../../api/api";

import * as actions from "../actions/index";
import { handleErrors } from "../utilities";

export function* login(action) {
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": `adb69d232d124c98fe20400d9a4757d71380ba1d4200697e6817c99a30959ed2`,
  };
  try {
    const apiUser = {
      username: action.payload.username,
      password: action.payload.password,
    };
    const response = yield api_axios("post", "/auth/login", apiUser, headers);
    // const response = yield axios.post(
    //     "http://localhost:8080/api/login",
    //     apiUser,
    //     {
    //         params: {
    //             token: "ALKCJNAS",
    //         },
    //         headers,
    //     }
    // );

    yield put(
      actions.loginUser({
        isLogged: true,
        loggedUser: response.data.user,
      })
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    if (response.data.user.role === "AGENCY") {
      action.payload.navigate("/home-agency/");
    } else action.payload.navigate("/home-admin/");
  } catch (error) {
    handleErrors(error);
  }
}

export function* getUser() {
  try {
    const response = yield api_axios("get", "/user", null);
    const loggedUser = response.data;
    yield put(
      actions.loginUser({
        isLogged: true,
        loggedUser,
      })
    );
  } catch (error) {
    localStorage.removeItem("token");
    window.location.reload();
  }
}

export function* logout() {
  try {
    yield api_axios("post", "/logout", null);
  } catch (error) {
    handleErrors(error);
  }
}
