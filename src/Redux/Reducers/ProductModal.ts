import { createSlice } from '@reduxjs/toolkit';

import { ProductType } from '../../Types';

let product: ProductType = {};

const slice = createSlice({
  name: 'ProductModal',
  initialState: {
    opened: false,
    product,
    stateBefore: false,
    stateAfter: false,
  },
  reducers: {
    setOpen(state, action) {
      state.opened = action.payload;
    },
    setProduct(state, action) {
      state.product = {...action.payload};
    },
    setStateBefore(state, action) {
      state.stateBefore = action.payload;
    },
    setStateAfter(state, action) {
      state.stateAfter = action.payload;
    }
  }
});

export const { setOpen, setProduct, setStateBefore, setStateAfter } = slice.actions;
export default slice.reducer;