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
  isGift,
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
    <Stack
      direction="horizontal"
      style={{ marginTop: '.75rem' }}
      className="align-items-center">
      <Form.Check
        aria-label={title}
        style={{ fontSize: '1.125rem' }}
        className="d-none d-sm-block me-2"
        checked={selected}
        onChange={e => updateProduct({ selected: e.target.checked })}
      />

      <div className="cart-product-image-container px-sm-2 mb-auto">
        <img className="mw-100" src={image} alt={title} />
      </div>

      <div className="ps-2 flex-grow-1 mb-auto" style={{ fontSize: '.75rem' }}>
        <Stack className="flex-sm-row align-items-start justify-content-between">
          <p className="cart-product-title lh-sm mb-1">
            {title.length > 85 ? title.slice(0, 85) + '...' : title}
          </p>
          <p
            style={{ fontSize: '1.2rem' }}
            className="d-none d-sm-block fw-semibold text-nowrap text-end col-sm-3">
            ${Number(price).toFixed(2)}
          </p>
          <p
            style={{ lineHeight: 1, fontSize: '.8125rem' }}
            className="d-flex d-sm-none align-items-start fw-bold mb-0">
            <span style={{ marginTop: '.185rem' }}>$</span>
            <span style={{ fontSize: '1.375rem' }}>{Math.trunc(price)}</span>
            <span style={{ marginTop: '.125rem' }}>
              {Number(price).toFixed(2).split('.')[1]}
            </span>
          </p>
        </Stack>

        {inStock > 15 ? (
          <p className="text-success mb-0">In Stock</p>
        ) : (
          <p className="text-danger mb-0">
            Only {inStock} left in stock - order soon
          </p>
        )}

        <Form.Check className="d-none d-sm-block">
          <Form.Check.Input
            className="border-secondary"
            style={{ fontSize: '.8125rem' }}
            checked={isGift}
            onChange={e => updateProduct({ isGift: e.target.checked })}
          />
          <Form.Check.Label>
            This is a gift <span style={{ color: '#007185' }}>Learn More</span>
          </Form.Check.Label>
        </Form.Check>

        <Stack>
          {Object.entries(highlights).map(([key, value]) => (
            <div key={key} className="d-flex">
              <p className="fw-bold me-1 mb-0 text-capitalize">{key}:</p>
              <p className="m-0">{value}</p>
            </div>
          ))}
        </Stack>

        {!hideButton && (
          <div className="d-flex mt-2 align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                className="rounded-2 border-secondary text-dark"
                style={{
                  fontSize: '.8125rem',
                  backgroundColor: '#F0F2F2',
                  boxShadow: '0 2px 5px 0 rgb(213 217 217 / 50%)',
                }}>
                Qty: <span className="mx-1">{quantity}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="overflow-auto cart-product-quantity-menu">
                <Dropdown.Item eventKey="0" onClick={removeFromBasket}>
                  0 (Delete)
                </Dropdown.Item>
                <Dropdown.Divider className="my-0" />
                {Array(Math.min(9, inStock))
                  .fill()
                  .map((_, i) => (
                    <Dropdown.Item
                      key={i}
                      eventKey={i + 1}
                      active={i + 1 === quantity}
                      onClick={() => updateProduct({ quantity: i + 1 })}>
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

            <div
              style={{ marginLeft: '.75rem', paddingLeft: '.75rem' }}
              className="d-flex border-start">
              <Button
                variant="link"
                style={{ fontSize: 'inherit', lineHeight: 1 }}
                className="p-0 text-decoration-none link-success"
                onClick={removeFromBasket}>
                Delete
              </Button>
            </div>

            <div
              style={{ marginLeft: '.75rem', paddingLeft: '.75rem' }}
              className="d-flex border-start">
              <Button
                disabled
                variant="link"
                style={{ fontSize: 'inherit', lineHeight: 1 }}
                className="p-0 text-decoration-none link-success">
                Save for later
              </Button>
            </div>

            <div
              style={{ marginLeft: '.75rem', paddingLeft: '.75rem' }}
              className="d-flex border-start">
              <Button
                disabled
                variant="link"
                style={{ fontSize: 'inherit', lineHeight: 1 }}
                className="p-0 text-decoration-none link-success">
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
