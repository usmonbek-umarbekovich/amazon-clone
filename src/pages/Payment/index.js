import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import classNames from 'classnames';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { db } from '../../config/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { useUserContext } from '../../contexts/UserProvider';

import {
  selectTotalPrice,
  selectAllProducts,
} from '../../features/basket/basketSlice';

import {
  makePayment,
  fetchClientSecret,
} from '../../features/payment/paymentSlice';

import CheckoutProduct from '../../components/Checkout/CheckoutProduct';
import './style.css';

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(selectAllProducts);
  const totalPrice = useSelector(selectTotalPrice);

  const paymentError = useSelector(state => state.payment.error);
  const paymentStatus = useSelector(state => state.payment.status);
  const clientSecret = useSelector(state => state.payment.clientSecret);

  const user = useUserContext();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!totalPrice) return;
    dispatch(fetchClientSecret(totalPrice));
  }, [dispatch, totalPrice]);

  useEffect(() => {
    if (paymentError) console.log(paymentError);
  }, [paymentError]);

  useEffect(() => {
    if (paymentStatus !== 'fulfilled') return;
    navigate('/orders', { replace: true });
  }, [navigate, paymentStatus]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (paymentStatus !== 'idle') return;

    dispatch(
      makePayment({
        db,
        user,
        stripe,
        elements,
        CardElement,
        clientSecret,
        basket: products,
      })
    );
  };

  const handleChange = e => {
    setIsComplete(e.complete);
    if (e.error) setError(e.error.message);
  };

  const isButtonDisabled =
    error !== '' ||
    isComplete === false ||
    paymentStatus === 'pending' ||
    paymentStatus === 'fulfilled';

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
                <button
                  disabled={isButtonDisabled}
                  className={classNames({ 'opacity-75': isButtonDisabled })}>
                  <span>
                    {paymentStatus === 'pending' ? 'Processing' : 'Buy Now'}
                  </span>
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
