import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import { useDispatch, useSelector } from 'react-redux';
import {
  basketUpdated,
  selectAllProducts,
  selectProductIds,
  selectTotalPrice,
  selectTotalQuantity,
} from '../features/basket/basketSlice';

import Subtotal from '../components/Subtotal';
import CheckoutProduct from '../components/CheckoutProduct';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Checkout() {
  const dispatch = useDispatch();

  const productIds = useSelector(selectProductIds);
  const totalPrice = useSelector(selectTotalPrice);
  const numItems = useSelector(selectTotalQuantity);

  const isAllSelected = useSelector(state => {
    const products = selectAllProducts(state);
    return products.every(({ selected }) => selected);
  });

  useEffect(() => {
    document.title = 'Amazon.com Shopping Cart';
  }, []);

  const handleSelectProducts = () => {
    dispatch(basketUpdated({ selected: !isAllSelected }));
  };

  return (
    <main id="shopping-cart">
      <Container fluid className="p-0 pb-3">
        <Stack className="flex-lg-row-reverse col-lg-12 col-md-10 mx-auto align-items-start">
          {numItems > 0 && (
            <Subtotal
              totalPrice={totalPrice}
              numItems={numItems}
              className="d-none d-sm-block subtotal-container bg-white p-4 pt-3 mb-4 ms-lg-4"
            />
          )}
          <div className="cart-items-container bg-white me-auto">
            {numItems > 0 ? (
              <>
                <h1 className="d-none d-sm-block h3 mb-0">Shopping Cart</h1>
                <Button
                  variant="link"
                  style={{ fontSize: '.875rem' }}
                  className="d-none d-sm-block text-decoration-none p-0 mb-0 link-success"
                  onClick={handleSelectProducts}>
                  {isAllSelected ? 'Deselect' : 'Select'} all items
                </Button>
                <p
                  style={{ fontSize: '.875rem' }}
                  className="d-none d-sm-block text-secondary text-end mb-0">
                  Price
                </p>
                <ListGroup variant="flush" className="border-top border-bottom">
                  {productIds.map(id => (
                    <ListGroup.Item key={id} className="cart-product-container">
                      <CheckoutProduct id={id} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <CurrencyFormat
                  decimalScale={2}
                  value={totalPrice}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                  renderText={value => (
                    <p
                      style={{ fontSize: '1.125rem' }}
                      className="d-none d-sm-block text-nowrap text-end">
                      Subtotal ({numItems} item
                      {numItems === 1 ? '' : 's'}):{' '}
                      <strong className="fw-semibold">{value}</strong>
                    </p>
                  )}
                />
              </>
            ) : (
              <>
                <div className="p-3 px-sm-0">
                  <h1 className="h3 mb-2">Your Amazon Cart is empty.</h1>
                  <p style={{ fontSize: '0.875rem' }} className="mb-0">
                    Your Shopping Cart lives to serve. Give it purpose — fill it
                    with groceries, clothing, household supplies, electronics,
                    and more. Continue shopping on the{' '}
                    <Link to="/" className="text-decoration-none">
                      Amazon.com homepage
                    </Link>
                    .
                  </p>
                </div>
              </>
            )}
          </div>
        </Stack>
      </Container>
    </main>
  );
}
export default Checkout;
