import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    forword: (state) => {
      state.page += 1;
    },
    backword: (state) => {
      state.page -= 1;
    },
  },
});

export const { forword, backword } = pageSlice.actions;
