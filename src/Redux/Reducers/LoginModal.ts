import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'LoginModal',
  initialState: {
    opened: false,
    stateBefore: false,
    stateAfter: false,
  },
  reducers: {
    setOpen(state, action) {
      state.opened = action.payload;
    },
    setStateBefore(state, action) {
      state.stateBefore = action.payload;
    },
    setStateAfter(state, action) {
      state.stateAfter = action.payload;
    }
  }
});

export const { setOpen, setStateBefore, setStateAfter } = slice.actions;
export default slice.reducer;