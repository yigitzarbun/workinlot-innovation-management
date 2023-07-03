import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

enum LsKeys {
  currentUser = "currentUser",
}

interface CurrentUser {
  user_id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
}

interface CurrentUserState {
  currentUser: CurrentUser | null;
}

const loadCurrentUserFromLs = (): CurrentUser | null => {
  const storedCurrentUser = localStorage.getItem(LsKeys.currentUser);
  if (storedCurrentUser) {
    return JSON.parse(storedCurrentUser);
  }
  return null;
};

const initialState: CurrentUserState = {
  currentUser: loadCurrentUserFromLs(),
};

export const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState,
  reducers: {
    getCurrentUser: (state) => state,
    addCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = { ...state.currentUser, ...action.payload }; // Merge the existing and updated user details
      localStorage.setItem(
        LsKeys.currentUser,
        JSON.stringify(state.currentUser)
      );
    },
    logoutCurrentUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem(LsKeys.currentUser);
    },
  },
});

export const { getCurrentUser, addCurrentUser, logoutCurrentUser } =
  currentUserSlice.actions;
export const selectCurrentUser = (state: RootState) =>
  state.currentUser.currentUser;
export default currentUserSlice.reducer;
