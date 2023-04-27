import { configureStore } from '@reduxjs/toolkit';
import ProductModal from './Reducers/ProductModal';

export const store = configureStore({
  reducer: {
    ProductModal
  }
});

export type RootState = ReturnType<typeof store.getState>;