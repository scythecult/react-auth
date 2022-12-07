import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userLogin: "",
  userToken: "",
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.userToken = action.payload.token;
      state.userLogin = action.payload.login;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.userToken = "";
      state.userLogin = "";
    },
  },
});

const { logIn, logOut } = userAuthSlice.actions;
const userAuthReducer = userAuthSlice.reducer;

export { userAuthReducer, logIn, logOut };
