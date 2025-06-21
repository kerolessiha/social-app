import { configureStore } from "@reduxjs/toolkit"; // Import properly
import { authReducer } from "./authSlice"; // Assuming authSlice exports authReducer
import { postReducer } from "./postsSlice";
import { profileReducer } from "./profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Combine the slice reducers here
    post:postReducer,
    profile:profileReducer,
    
  },
});

export type dispatchType = typeof store.dispatch
export type stateType = ReturnType<typeof store.getState>
export default store;
