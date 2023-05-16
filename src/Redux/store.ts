import { configureStore } from '@reduxjs/toolkit';
import ProductModal from './Reducers/ProductModal';
import LoginModal from './Reducers/LoginModal';
import RegisterModal from './Reducers/RegisterModal';
import EndModal from './Reducers/EndModal';
import Cart from './Reducers/Cart';
import User from './Reducers/User';
import Endereco from './Reducers/Endereco';

export const store = configureStore({
  reducer: {
    ProductModal,
    LoginModal,
    RegisterModal,
    EndModal,
    Cart,
    User,
    Endereco
  }
});

export type RootState = ReturnType<typeof store.getState>;