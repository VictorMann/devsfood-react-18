import { configureStore } from '@reduxjs/toolkit';
import ProductModal from './Reducers/ProductModal';
import LoginModal from './Reducers/LoginModal';
import Cart from './Reducers/Cart';
import User from './Reducers/User';

export const store = configureStore({
  reducer: {
    ProductModal,
    LoginModal,
    Cart,
    User
  }
});

export type RootState = ReturnType<typeof store.getState>;