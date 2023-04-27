import { createSlice } from '@reduxjs/toolkit';

import { ProductType } from '../../Types';

let product: ProductType = {};

const slice = createSlice({
  name: 'ProductModal',
  initialState: {
    opened: false,
    product
  },
  reducers: {
    setOpen(state, action) {
      state.opened = action.payload;
    },
    setProduct(state, action) {
      state.product = {...action.payload};
    }
  }
});

export const { setOpen, setProduct } = slice.actions;
export default slice.reducer;