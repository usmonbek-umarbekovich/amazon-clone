import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import { getBasketTotal } from '../services/reducer';
import './style.css';

function Subtotal() {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  return (
    <div className="subtotal w-100 bg-white">
      <CurrencyFormat
        renderText={value => (
          <>
            <p>
              Subtotal ({basket.length} item{basket.length === 1 ? '' : 's'}):{' '}
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
      <button onClick={() => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}
export default Subtotal;
