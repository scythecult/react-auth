import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "../features/user-auth-slice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

export { store };
