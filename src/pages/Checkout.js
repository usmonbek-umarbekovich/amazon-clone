import { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../services/reducer';
import { useStateValue } from '../contexts/StateProvider';
import Subtotal from '../components/Subtotal';
import CheckoutProduct from '../components/CheckoutProduct';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const notAllSelected = basket.some(p => !p.selected);

  useEffect(() => {
    document.title = 'Amazon.com Shopping Cart';
  }, []);

  const handleSelectProducts = () => {
    dispatch({
      type: 'UPDATE_BASKET',
      payload: { selected: notAllSelected },
    });
  };

  return (
    <main id="shopping-cart" className="bg-light">
      <Container fluid className="p-0 pb-3">
        <Stack className="flex-lg-row-reverse col-lg-12 col-md-10 mx-auto align-items-start">
          <Subtotal className="d-none d-sm-block subtotal-container bg-white p-4 pt-3 mb-4 ms-lg-4" />
          <div className="cart-items-container bg-white">
            <h1 className="d-none d-sm-block h3 mb-0">Shopping Cart</h1>
            <Button
              variant="link"
              style={{ fontSize: '.875rem' }}
              className="d-none d-sm-block text-decoration-none p-0 mb-0 link-success"
              onClick={handleSelectProducts}>
              {notAllSelected ? 'Select' : 'Deselect'} all items
            </Button>
            <p
              style={{ fontSize: '.875rem' }}
              className="d-none d-sm-block text-secondary text-end mb-0">
              Price
            </p>
            <ListGroup variant="flush" className="border-top border-bottom">
              {basket.map((product, index) => (
                <ListGroup.Item
                  key={product.id}
                  className="cart-product-container">
                  <CheckoutProduct
                    index={index}
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
                </ListGroup.Item>
              ))}
            </ListGroup>
            <CurrencyFormat
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType="text"
              thousandSeparator={true}
              prefix="$"
              renderText={value => (
                <p
                  style={{ fontSize: '1.125rem' }}
                  className="d-none d-sm-block text-nowrap text-end">
                  Subtotal ({basket.length} item
                  {basket.length === 1 ? '' : 's'}):{' '}
                  <strong className="fw-semibold">{value}</strong>
                </p>
              )}
            />
          </div>
        </Stack>
      </Container>
    </main>
  );
}
export default Checkout;
