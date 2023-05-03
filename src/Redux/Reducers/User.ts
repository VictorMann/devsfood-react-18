import { createSlice } from "@reduxjs/toolkit";

import { UserType } from "../../Types";

let data: UserType = {};

const slice = createSlice({
  name: 'User',
  initialState: { data },
  reducers: {
    setUser(state, action) {
      state.data = {...action.payload};
    }
  }
});

export const { setUser } = slice.actions;
export default slice.reducer;