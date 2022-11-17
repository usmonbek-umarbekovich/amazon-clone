import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useStateValue } from '../contexts/StateProvider';
import { MdDeleteOutline } from 'react-icons/md';

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
    <Stack className="flex-sm-row align-items-center">
      <Form.Check
        aria-label={title}
        style={{ fontSize: '1.125rem' }}
        className="d-none d-sm-block me-2"
        checked={selected}
        onChange={e => updateProduct({ selected: e.target.checked })}
      />

      <Stack
        direction="horizontal"
        className="flex-grow-1 align-items-start"
        style={{ marginTop: '.75rem', marginBottom: '.25rem' }}>
        <div className="cart-product-image-container px-sm-2">
          <img className="mw-100" src={image} alt={title} />
        </div>

        {/* Product info */}
        <div id="cart-product-info-container" className="ps-2 flex-grow-1">
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
              className="d-flex d-sm-none align-items-start fw-bold mb-2">
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

          <Form.Check
            style={{ minHeight: 0 }}
            className="d-none d-sm-block mb-0 ms-1">
            <Form.Check.Input
              className="border-secondary"
              style={{ fontSize: '.8125rem' }}
              checked={isGift}
              onChange={e => updateProduct({ isGift: e.target.checked })}
            />
            <Form.Check.Label>
              This is a gift{' '}
              <span style={{ color: '#007185' }}>Learn More</span>
            </Form.Check.Label>
          </Form.Check>

          <Stack style={{ marginTop: '.125rem' }}>
            {Object.entries(highlights).map(([key, value]) => (
              <div key={key} className="d-flex">
                <p className="fw-bold me-1 mb-0 text-capitalize">{key}:</p>
                <p className="m-0">{value}</p>
              </div>
            ))}
          </Stack>

          {/* Control buttons on large screens */}
          {!hideButton && (
            <div
              id="cart-control-sm-container"
              className="d-none d-sm-flex align-items-center"
              style={{ fontSize: '.75rem' }}>
              <Dropdown>
                <Dropdown.Toggle
                  size="sm"
                  className="rounded-2 border-secondary text-dark">
                  Qty: <span className="mx-1">{quantity}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="cart-product-quantity-menu">
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

              <div className="btn-container d-flex border-start">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none link-success"
                  onClick={removeFromBasket}>
                  Delete
                </Button>
              </div>

              <div className="btn-container d-flex border-start">
                <Button
                  disabled
                  variant="link"
                  className="p-0 text-decoration-none link-success">
                  Save for later
                </Button>
              </div>

              <div className="btn-container d-flex border-start">
                <Button
                  disabled
                  variant="link"
                  className="p-0 text-decoration-none link-success">
                  Compare with similar items
                </Button>
              </div>
            </div>
          )}
        </div>
      </Stack>

      {/* Control buttons on small screens */}
      {!hideButton && (
        <div
          id="cart-control-container"
          className="d-flex d-sm-none flex-wrap align-items-center"
          style={{ fontSize: '.75rem' }}>
          <ButtonGroup
            size="sm"
            aria-label="Product Quantity"
            className="cart-quantity-controller">
            <Button
              variant="light"
              onClick={() =>
                quantity === 1
                  ? removeFromBasket()
                  : updateProduct({ quantity: quantity - 1 })
              }>
              {quantity === 1 ? <MdDeleteOutline /> : '-'}
            </Button>
            <Button variant="light">{quantity}</Button>
            <Button
              variant="light"
              onClick={() => updateProduct({ quantity: quantity + 1 })}>
              {'+'}
            </Button>
          </ButtonGroup>

          <div className="btn-container d-flex border-start">
            <Button
              variant="link"
              className="p-0 text-decoration-none link-success"
              onClick={removeFromBasket}>
              Delete
            </Button>
          </div>

          <div className="btn-container d-flex border-start">
            <Button
              disabled
              variant="link"
              className="p-0 text-decoration-none link-success">
              Save for later
            </Button>
          </div>

          <div className="btn-container d-flex border-start">
            <Button
              disabled
              variant="link"
              className="p-0 text-decoration-none link-success">
              Compare with similar items
            </Button>
          </div>
        </div>
      )}
    </Stack>
  );
}
export default CheckoutProduct;
