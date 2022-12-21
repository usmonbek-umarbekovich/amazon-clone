import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import {
  basketUpdated,
  selectAllProducts,
} from '../../features/basket/basketSlice';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';

function Subtotal({ className, numItems, totalPrice }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const includeGift = useSelector(state => {
    const products = selectAllProducts(state);
    return products.some(({ isGift }) => isGift);
  });

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

  const updateBasketProducts = changes => {
    dispatch(basketUpdated(changes));
  };

  return (
    <>
      <div className={className}>
        <CurrencyFormat
          decimalScale={2}
          value={totalPrice}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
          renderText={value => (
            <p style={{ fontSize: '1.125rem' }} className="lh-sm mb-lg-0 mb-3">
              Subtotal ({numItems} item{numItems === 1 ? '' : 's'}):{' '}
              <strong className="fw-semibold">{value}</strong>
            </p>
          )}
        />
        <Stack
          direction="horizontal"
          className="flex-lg-column justify-content-between align-items-center">
          <Form.Check className="mb-lg-3 me-lg-auto">
            <Form.Check.Input
              className="border-secondary"
              style={{ marginTop: '.4rem', fontSize: '.8125rem' }}
              checked={includeGift}
              onChange={e => updateBasketProducts({ isGift: e.target.checked })}
            />
            <Form.Check.Label style={{ fontSize: '.875rem' }}>
              This order contains a gift
            </Form.Check.Label>
          </Form.Check>
          <Button
            variant="warning"
            style={{ fontSize: '.875rem' }}
            className="rounded-3 col-lg-12 col-6"
            onClick={() => navigate('/payment')}>
            Proceed to Checkout
          </Button>
        </Stack>
      </div>

      <div
        id="subtotal-sm-header"
        style={{ padding: '.875rem', paddingBottom: '0' }}
        className="d-sm-none bg-white w-100">
        <CurrencyFormat
          decimalScale={2}
          value={Math.trunc(totalPrice)}
          displayType="text"
          thousandSeparator={true}
          renderText={value => (
            <div className="d-flex align-items-center">
              <p style={{ fontSize: '1.25rem' }} className="mb-0 me-1 mt-1">
                Subtotal
              </p>
              <p
                style={{ lineHeight: 1, fontSize: '.8125rem' }}
                className="d-flex align-items-start fw-bold mb-0">
                <span style={{ marginTop: '.185rem' }}>$</span>
                <span style={{ fontSize: '1.375rem' }}>{value}</span>
                <span style={{ marginTop: '.125rem' }}>
                  {Number(totalPrice).toFixed(2).split('.')[1]}
                </span>
              </p>
            </div>
          )}
        />
      </div>
      <div
        ref={checkoutBtnContainerRef}
        id="checkout-sm-button"
        style={{ padding: '.625rem .875rem', zIndex: '1000' }}
        className="d-sm-none bg-white w-100 position-sticky top-0">
        <Button
          size="lg"
          variant="warning"
          style={{ fontSize: '.9375rem', padding: '.66rem 0' }}
          className="w-100"
          onClick={() => navigate('/payment')}>
          Proceed to Checkout ({numItems} item
          {numItems === 1 ? '' : 's'})
        </Button>
      </div>
      <div
        id="gift-sm-check"
        style={{ padding: '.375rem .875rem 1.375rem .875rem' }}
        className="d-sm-none bg-white w-100">
        <Form.Check className="d-flex align-items-center ps-0">
          <Form.Check.Input
            style={{ fontSize: '1.5rem' }}
            className="m-0 me-2"
            checked={includeGift}
            onChange={e => updateBasketProducts({ isGift: e.target.checked })}
          />
          <Form.Check.Label style={{ fontSize: '.9375rem' }}>
            Send as a gift. Include custom message
          </Form.Check.Label>
        </Form.Check>
      </div>
    </>
  );
}
export default Subtotal;
