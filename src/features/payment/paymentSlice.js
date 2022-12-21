import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc } from 'firebase/firestore';

import { basketCleaned } from '../basket/basketSlice';
import axios from '../../services/axios';

const makePayment = createAsyncThunk(
  'payment/makePayment',
  async (
    { db, user, basket, stripe, elements, clientSecret, CardElement },
    { dispatch }
  ) => {
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (user) {
      const orderRef = doc(db, 'users', user.uid, 'orders', paymentIntent.id);
      await setDoc(orderRef, {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
    }

    dispatch(basketCleaned());
  }
);

const fetchClientSecret = createAsyncThunk(
  'payment/fetchClientSecret',
  async totalPrice => {
    const response = await axios({
      method: 'post',
      url: '/payments/create',
      params: { total: totalPrice * 100 },
    });
    return response.data.clientSecret;
  }
);

const initialState = {
  error: null,
  status: 'idle',
  clientSecret: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(makePayment.pending, payment => {
        payment.status = 'pending';
      })
      .addCase(makePayment.fulfilled, payment => {
        payment.status = 'fulfilled';
      })
      .addCase(makePayment.rejected, (payment, action) => {
        payment.status = 'rejected';
        payment.error = action.error.message;
      })
      .addCase(fetchClientSecret.fulfilled, (payment, action) => {
        payment.clientSecret = action.payload;
      });
  },
});

export { makePayment, fetchClientSecret };
export default paymentSlice.reducer;
