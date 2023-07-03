import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { users } from "../../data/users/Users";

enum LsKeys {
  users = "users",
}

interface User {
  user_id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
}

interface UsersState {
  users: User[];
}

const loadUsersFromLocalStorage = (): User[] => {
  const storedUsers = localStorage.getItem(LsKeys.users);
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  return [...users];
};

const initialState: UsersState = {
  users: [...loadUsersFromLocalStorage()],
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    getUsers: (state) => state,
    addUser: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(
        (user) => user.user_id === updatedUser.user_id
      );
      if (index !== -1) {
        state.users[index] = updatedUser;
      } else {
        state.users.push(updatedUser);
      }
      localStorage.setItem(LsKeys.users, JSON.stringify(state.users));
    },
  },
});

export const { getUsers, addUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;
export default usersSlice.reducer;
