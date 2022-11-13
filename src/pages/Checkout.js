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
    <main className="bg-light">
      <Container fluid className="p-0 pb-3 p-sm-4">
        <Stack className="flex-lg-row-reverse col-lg-12 col-md-10 mx-auto align-items-start">
          <Subtotal className="d-none d-sm-block subtotal-container bg-white p-4 pt-3 mb-4 ms-lg-4" />
          <div className="cart-items-container bg-white p-sm-4">
            <h1 className="d-none d-sm-block h3 mb-0">Shopping Cart</h1>
            <Button
              variant="link"
              className="d-none d-sm-block text-decoration-none p-0 mb-0"
              onClick={handleSelectProducts}>
              {notAllSelected ? 'Select' : 'Deselect'} all items
            </Button>
            <p className="d-none d-sm-block text-secondary text-end mb-0">
              Price
            </p>
            <ListGroup variant="flush" className="border-top border-bottom">
              {basket.map((product, index) => (
                <ListGroup.Item
                  key={product.id}
                  className="p-2 pt-sm-4 pb-sm-3 px-sm-0 ps-lg-3">
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
                  style={{ fontSize: '1.2rem' }}
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
