import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../contexts/StateProvider';
import { getBasketTotal } from '../services/reducer';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Subtotal({ className }) {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();
  const checkoutBtnContainerRef = useRef();
  const prevScrollTop = useRef(1);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      'scroll',
      () => {
        if (window.innerWidth >= 576) return;

        const currScrollTop =
          checkoutBtnContainerRef.current.getBoundingClientRect().top;

        if (
          (prevScrollTop.current > 0 && currScrollTop > 0) ||
          (prevScrollTop.current === 0 && currScrollTop === 0)
        )
          return;

        if (currScrollTop === 0) {
          checkoutBtnContainerRef.current.classList.add('border-bottom');
        } else if (currScrollTop > 0) {
          checkoutBtnContainerRef.current.classList.remove('border-bottom');
        }
        prevScrollTop.current = currScrollTop;
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  }, []);

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

      <div
        id="subtotal-sm-header"
        className="d-sm-none bg-white w-100 p-3 pb-2">
        <CurrencyFormat
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
          renderText={value => (
            <p className="fs-5 lh-sm mb-0">
              Subtotal <strong className="fw-semibold">{value}</strong>
            </p>
          )}
        />
      </div>
      <div
        ref={checkoutBtnContainerRef}
        id="checkout-sm-button"
        style={{ zIndex: '1000' }}
        className="d-sm-none bg-white w-100 px-3 py-2 position-sticky top-0">
        <Button
          variant="warning"
          className="w-100 py-2"
          onClick={() => navigate('/payment')}>
          Proceed to Checkout ({basket.length} item
          {basket.length === 1 ? '' : 's'})
        </Button>
      </div>
      <div id="gift-sm-check" className="d-sm-none bg-white w-100 p-3 pt-2">
        <Form.Check className="d-flex align-items-center ps-0">
          <Form.Check.Input className="fs-4 m-0 me-2" />
          <Form.Check.Label>
            Send as a gift. Include custom message
          </Form.Check.Label>
        </Form.Check>
      </div>
    </>
  );
}
export default Subtotal;
