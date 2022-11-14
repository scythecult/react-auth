import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logIn(state) {
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  },
});

const { logIn, logOut } = userAuthSlice.actions;
const userAuthReducer = userAuthSlice.reducer;

export { userAuthReducer, logIn, logOut };
