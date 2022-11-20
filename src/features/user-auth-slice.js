import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userToken: "",
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.userToken = action.payload;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  },
});

const { logIn, logOut } = userAuthSlice.actions;
const userAuthReducer = userAuthSlice.reducer;

export { userAuthReducer, logIn, logOut };
