import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../features/basket/basketSlice';
import paymentReducer from '../features/payment/paymentSlice';

export default configureStore({
  reducer: {
    basket: basketReducer,
    payment: paymentReducer,
  },
});
