import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { adminDashboardData } from "../../data/admin-dashboard/AdminDashboardData";

enum LsKeys {
  userFormData = "userFormData",
}

export type UserForm = {
  prioritization: string[] | string;
  scale: string;
  sector: string[] | string;
  unit: string[] | string;
  innovation_goals: string[] | string;
  innovation_state: string[] | string;
  success_definition: string[] | string;
  currentUserId: number | null; // Update the type to be 'number | null'
};

interface UserFormDataState {
  userFormData: UserForm[];
}

const loadUserFormDataFromLs = (): UserForm[] => {
  const storedUserFormData = localStorage.getItem(LsKeys.userFormData);
  if (storedUserFormData) {
    return JSON.parse(storedUserFormData);
  }
  return adminDashboardData;
};

const initialState: UserFormDataState = {
  userFormData: loadUserFormDataFromLs(),
};

export const userFormDataSlice = createSlice({
  name: "userFormDataSlice",
  initialState,
  reducers: {
    getUserFormData: (state) => state,
    addUserFormData: (state, action: PayloadAction<UserForm>) => {
      const updatedFormData = action.payload;
      const index = state.userFormData.findIndex(
        (formData) => formData.currentUserId === updatedFormData.currentUserId
      );
      if (index !== -1) {
        state.userFormData[index] = updatedFormData;
      } else {
        state.userFormData.push(updatedFormData);
      }
      localStorage.setItem(
        LsKeys.userFormData,
        JSON.stringify(state.userFormData)
      );
    },
  },
});

export const { getUserFormData, addUserFormData } = userFormDataSlice.actions;
export const selectUserFormData = (state: RootState) => state.userFormData;
export default userFormDataSlice.reducer;
