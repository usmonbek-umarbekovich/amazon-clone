import { Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Header from '../layouts/Header';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Checkout from '../pages/Checkout';
import Payment from '../pages/Payment';
import Orders from '../pages/Orders';

import '../components/style.css';

const promise = loadStripe(
  'pk_test_51LrmN4CMUJYb034JpqEEBFp1laHuSskqorlDHr1hAudyNGghY7nmzZMRbou9rQA1flPGNi0CzV4xuONFVvQ9sT2W00svwZtrei'
);

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="payment"
          element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
