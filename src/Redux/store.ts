import { configureStore } from '@reduxjs/toolkit';
import ProductModal from './Reducers/ProductModal';
import Cart from './Reducers/Cart';

export const store = configureStore({
  reducer: {
    ProductModal,
    Cart
  }
});

export type RootState = ReturnType<typeof store.getState>;