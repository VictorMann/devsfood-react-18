import { createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../../Types';

let cart: CartItemType[] = [];

const slice = createSlice({
  name: 'Cart',
  initialState: {
    data: cart
  },
  reducers: {
    setAdd(state, action) {
      state.data = [...action.payload];
    }
  }
});

export const { setAdd } = slice.actions;
export default slice.reducer;