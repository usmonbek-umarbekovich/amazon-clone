import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { auth } from '../../config';
import { useStateValue } from '../../contexts/StateProvider';
import Header from '../../layouts/Header';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Checkout from '../../pages/Checkout';
import Payment from '../../pages/Payment';
import './style.css';

const promise = loadStripe(
  'pk_test_51LrmN4CMUJYb034JpqEEBFp1laHuSskqorlDHr1hAudyNGghY7nmzZMRbou9rQA1flPGNi0CzV4xuONFVvQ9sT2W00svwZtrei'
);

function App() {
  const [_, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          payload: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          payload: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </Routes>
    </div>
  );
}

export default App;
