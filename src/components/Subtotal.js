import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import { getBasketTotal } from '../services/reducer';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Subtotal() {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  return (
    <div>
      <CurrencyFormat
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
        renderText={value => (
          <p
            style={{ fontSize: '1.2rem' }}
            className="lh-sm mb-lg-0 mb-sm-3 mb-0">
            Subtotal{' '}
            <span className="d-none d-sm-inline">
              ({basket.length} item
              {basket.length === 1 ? '' : 's'}):{' '}
            </span>
            <strong className="fw-semibold">{value}</strong>
          </p>
        )}
      />
      <Stack className="flex-lg-column-reverse flex-sm-row-reverse justify-content-between align-items-sm-center">
        <Button
          variant="warning"
          style={{ fontSize: '.85rem' }}
          className="rounded-3 col-lg-12 col-sm-6 my-3 my-sm-0"
          onClick={() => navigate('/payment')}>
          Proceed to Checkout
          <span className="d-sm-none">
            {' '}
            ({basket.length} item
            {basket.length === 1 ? '' : 's'})
          </span>
        </Button>
        <Form.Check className="mb-lg-3 me-lg-auto">
          <Form.Check.Input />
          <Form.Check.Label>
            <span className="d-none d-sm-inline">
              This order contains a gift
            </span>
            <span className="d-sm-none">
              Send as a gift. Include custom message
            </span>
          </Form.Check.Label>
        </Form.Check>
      </Stack>
    </div>
  );
}
export default Subtotal;
