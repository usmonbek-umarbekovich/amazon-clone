import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useStateValue } from '../contexts/StateProvider';

function CheckoutProduct({
  id,
  index,
  image,
  title,
  price,
  inStock,
  quantity,
  highlights,
  selected,
  hideButton,
}) {
  const dispatch = useStateValue()[1];

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      payload: { id, index },
    });
  };

  const updateProduct = changes => {
    dispatch({
      type: 'UPDATE_BASKET_PRODUCT',
      payload: { id, changes },
    });
  };

  return (
    <Stack direction="horizontal" className="align-items-center">
      <Form.Check
        aria-label={title}
        className="d-none d-sm-block fs-5 me-2"
        checked={selected}
        onChange={e => {
          updateProduct({ selected: e.target.checked });
        }}
      />

      <div className="cart-product-image-container px-2 mb-auto">
        <img className="w-100 h-100" src={image} alt={title} />
      </div>

      <div className="ps-2 flex-grow-1 mb-auto">
        <Stack className="flex-sm-row align-items-start justify-content-between">
          <p style={{ fontSize: '1.2rem' }} className="lh-sm mb-2">
            {title.length > 85 ? title.slice(0, 85) + '...' : title}
          </p>
          <p
            style={{ fontSize: '1.2rem' }}
            className="fw-semibold text-nowrap text-end col-sm-3">
            ${Number(price).toFixed(2)}
          </p>
        </Stack>

        {inStock > 15 ? (
          <p className="text-success mb-0">In Stock</p>
        ) : (
          <p className="text-danger mb-0">
            Only {inStock} left in stock - order soon
          </p>
        )}

        <Form.Check>
          <Form.Check.Input />
          <Form.Check.Label>
            This is a gift <span style={{ color: '#007185' }}>Learn More</span>
          </Form.Check.Label>
        </Form.Check>

        <Stack>
          {Object.entries(highlights).map(([key, value]) => (
            <div key={key} className="d-flex">
              <p className="fw-bold me-1 mb-0">{key}:</p>
              <p className="m-0">{value}</p>
            </div>
          ))}
        </Stack>

        {!hideButton && (
          <div className="d-flex mt-2">
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                className="rounded-2 border-secondary text-dark"
                style={{
                  backgroundColor: '#F0F2F2',
                  boxShadow: '0 2px 5px 0 rgb(213 217 217 / 50%)',
                }}>
                Qty: <span className="mx-1">{quantity}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="overflow-auto cart-product-quantity-menu">
                <Dropdown.Item eventKey="0">0 (Delete)</Dropdown.Item>
                <Dropdown.Divider className="my-0" />
                {Array(Math.min(9, inStock))
                  .fill()
                  .map((_, i) => (
                    <Dropdown.Item
                      key={i}
                      eventKey={i + 1}
                      active={i + 1 === quantity}>
                      {i + 1}
                    </Dropdown.Item>
                  ))}
                {inStock > 9 && (
                  <>
                    <Dropdown.Divider className="my-0" />
                    <Dropdown.Item eventKey="10">10+</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <div className="border-start ps-3 ms-3">
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={removeFromBasket}>
                Delete
              </Button>
            </div>

            <div className="border-start ps-3 ms-3">
              <Button variant="link" className="p-0 text-decoration-none">
                Save for later
              </Button>
            </div>

            <div className="border-start ps-3 ms-3">
              <Button variant="link" className="p-0 text-decoration-none">
                Compare with similar items
              </Button>
            </div>
          </div>
        )}
      </div>
    </Stack>
  );
}
export default CheckoutProduct;
