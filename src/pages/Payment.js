import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import axios from '../services/axios';

import { useDispatch, useSelector } from 'react-redux';
import {
  basketCleaned,
  selectTotalPrice,
  selectAllProducts,
} from '../features/basket/basketSlice';
import { useUserContext } from '../contexts/UserProvider';

import CheckoutProduct from '../components/CheckoutProduct';
import './style.css';

function Payment() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalPrice = useSelector(selectTotalPrice);

  const navigate = useNavigate();

  const user = useUserContext();
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: '/payments/create',
        params: { total: totalPrice * 100 },
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [totalPrice]);

  const handleSubmit = async e => {
    e.preventDefault();

    setProcessing(true);
    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (user) {
        const orderRef = doc(db, 'users', user.uid, 'orders', paymentIntent.id);
        await setDoc(orderRef, {
          basket: products,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      }

      setSucceeded(true);
      setError('');
      dispatch(basketCleaned());
      navigate('/orders', { replace: true });
    } catch (err) {
      console.log(err);
    }
    setProcessing(false);
  };

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to="/checkout">
            {products.length ?? 0} item{products.length ? 's' : ''}
          </Link>
          )
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {products.map(({ id }) => (
              <CheckoutProduct key={id} id={id} />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={value => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={totalPrice}
                  displayType="text"
                  thousandSeperator={true}
                  prefix="$"
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? 'Processing' : 'Buy Now'}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
