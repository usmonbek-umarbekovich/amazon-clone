import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { doc, setDoc } from 'firebase/firestore';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../components/CheckoutProduct';
import { useStateValue } from '../contexts/StateProvider';
import { getBasketTotal } from '../services/reducer';
import axios from '../services/axios';
import { db } from '../config';
import './style.css';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();
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
        params: { total: getBasketTotal(basket) * 100 },
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

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
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      }

      setSucceeded(true);
      setError('');
      dispatch({ type: 'EMPTY_BASKET' });
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
            {basket?.length ?? 0} item{basket?.length ? 's' : ''}
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
            {basket.map((product, index) => (
              <CheckoutProduct
                index={index}
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                inStock={product.inStock}
                quantity={product.quantity}
                highlights={product.highlights}
                selected={product.selected}
                isGift={product.isGift}
              />
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
                  value={getBasketTotal(basket)}
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
