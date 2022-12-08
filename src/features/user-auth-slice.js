import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEY } from "../consts/consts";

const userInfo = localStorage.getItem(STORAGE_KEY);

const { token = "", login: userLogin = "" } = JSON.parse(userInfo || "{}");

const initialState = {
  isLoggedIn: userLogin && token,
  userLogin: userLogin,
  userToken: token,
  expiresIn: 3600,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.userToken = action.payload.token;
      state.userLogin = action.payload.login;
      state.expiresIn = action.payload.expiresIn;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.userToken = "";
      state.userLogin = "";
      state.expiresIn = 3600;
    },
  },
});

const { logIn, logOut } = userAuthSlice.actions;
const userAuthReducer = userAuthSlice.reducer;

export { userAuthReducer, logIn, logOut };
