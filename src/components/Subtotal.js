import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import { getBasketTotal } from '../services/reducer';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Subtotal({ className }) {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  return (
    <>
      <div className={className}>
        <CurrencyFormat
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
          renderText={value => (
            <p style={{ fontSize: '1.2rem' }} className="lh-sm mb-lg-0 mb-3">
              Subtotal ({basket.length} item{basket.length === 1 ? '' : 's'}):{' '}
              <strong className="fw-semibold">{value}</strong>
            </p>
          )}
        />
        <Stack
          direction="horizontal"
          className="flex-lg-column justify-content-between align-items-center">
          <Form.Check
            label="This order contains a gift"
            className="mb-lg-3 me-lg-auto"
          />
          <Button
            variant="warning"
            className="rounded-3 col-lg-12 col-6"
            onClick={() => navigate('/payment')}>
            Proceed to Checkout
          </Button>
        </Stack>
      </div>

      <div id="subtotal-sm-header" className="bg-white w-100 px-3 pt-2 pb-1">
        <CurrencyFormat
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
          renderText={value => (
            <p style={{ fontSize: '1.2rem' }} className="d-sm-none lh-sm mb-0">
              Subtotal <strong className="fw-semibold">{value}</strong>
            </p>
          )}
        />
      </div>
      <div
        id="checkout-sm-button"
        style={{ zIndex: '1000' }}
        className="bg-white w-100 px-3 py-1 position-sticky top-0">
        <Button
          variant="warning"
          className="d-sm-none w-100 py-2"
          onClick={() => navigate('/payment')}>
          Proceed to Checkout ({basket.length} item
          {basket.length === 1 ? '' : 's'})
        </Button>
      </div>
      <div id="gift-sm-check" className="bg-white w-100 px-3 pt-1 pb-2">
        <Form.Check
          className="d-sm-none"
          label="Send as a gift. Include custom message"
        />
      </div>
    </>
  );
}
export default Subtotal;
