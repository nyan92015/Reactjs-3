import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: null,
    iconUrl: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializationUserData: (state) => {
      state.userData.name = null;
      state.userData.iconUrl = null;
    },
    setUserName: (state, action) => {
      state.userData.name = action.payload;
    },
    setUserIconUrl: (state, action) => {
      state.userData.iconUrl = action.payload;
    },
  },
});

export const { initializationUserData, setUserName, setUserIconUrl } =
  userSlice.actions;
