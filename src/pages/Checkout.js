import { useEffect } from 'react';
import { useStateValue } from '../contexts/StateProvider';
import Subtotal from '../components/Subtotal';
import CheckoutProduct from '../components/CheckoutProduct';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './style.css';

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
    <main className="bg-light px-2 py-3">
      <Container fluid>
        <Stack direction="horizontal" className="align-items-start">
          <div
            style={{ boxShadow: '0 0 .1em rgba(0, 0, 0, 0.1)' }}
            className="bg-white p-4 me-4">
            <h1 className="h3 mb-0">Shopping Cart</h1>
            <Button
              variant="link"
              className="p-0 mb-3"
              onClick={handleSelectProducts}>
              {notAllSelected ? 'Select' : 'Deselect'} all items
            </Button>
            <ListGroup variant="flush" className="border-top border-bottom">
              {basket.map((product, index) => (
                <ListGroup.Item key={product.id} className="pt-4 pb-3">
                  <CheckoutProduct
                    index={index}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    selected={product.selected}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div
            style={{
              width: '23%',
              flex: '0 0 auto',
              boxShadow: '0 0 .1em rgba(0, 0, 0, 0.1)',
            }}
            className="bg-white">
            <Subtotal />
          </div>
        </Stack>
      </Container>
    </main>
  );
}
export default Checkout;
