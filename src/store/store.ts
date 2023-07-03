import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import currentUserReducer from "./slices/currentUserSlice";
import userFormDataReducer from "./slices/userFormsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    userFormData: userFormDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
