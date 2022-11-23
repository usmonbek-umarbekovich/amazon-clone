import { useState, useEffect, useRef } from 'react';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
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
  selected,
  isGift,
  highlights = {},
}) {
  const [showModal, setShowModal] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isInputSubmitted, setIsInputSubmitted] = useState(true);
  const [inputQuantity, setInputQuantity] = useState('1');
  const inputQuantityRef = useRef();
  const dispatch = useStateValue()[1];

  useEffect(() => {
    if (!isInput || !inputQuantityRef.current) return;
    inputQuantityRef.current.focus();
    inputQuantityRef.current.select();
  }, [isInput]);

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

  const handleQuantitySubmit = e => {
    e.preventDefault();

    const parsed = Number(inputQuantity);
    if (Number.isInteger(parsed)) {
      if (parsed > 0) {
        updateProduct({ quantity: parsed });
        setIsInputSubmitted(true);
      } else {
        removeFromBasket();
      }

      if (parsed < 10) {
        setIsInput(false);
        setInputQuantity('1');
      }
    }
  };

  const handleQuantityChange = e => {
    const val = e.target.value;
    if (!val) return setInputQuantity('');

    const parsed = Number(val);
    if (Number.isInteger(parsed)) {
      setInputQuantity(parsed.toString());
    }
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
          <div
            id="cart-control-sm-container"
            className="d-none d-sm-flex align-items-center"
            style={{ fontSize: '.75rem' }}>
            {isInput ? (
              <Form
                className="d-flex align-items-center"
                onSubmit={handleQuantitySubmit}>
                <Form.Control
                  ref={inputQuantityRef}
                  size="sm"
                  maxLength={3}
                  aria-label="Quantity"
                  autoComplete="false"
                  className="me-1"
                  value={inputQuantity}
                  onChange={handleQuantityChange}
                  onFocus={() => setIsInputSubmitted(false)}
                />
                {inputQuantity && !isInputSubmitted && (
                  <Button
                    size="sm"
                    type="submit"
                    variant="warning"
                    className="rounded-3">
                    Update
                  </Button>
                )}
              </Form>
            ) : (
              <Dropdown>
                <Dropdown.Toggle
                  size="sm"
                  className="rounded-2 border-secondary text-dark">
                  Qty: <span className="mx-1">{quantity}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="cart-product-quantity-menu">
                  <Dropdown.Item
                    eventKey="0"
                    active={false}
                    onClick={removeFromBasket}>
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
                      <Dropdown.Item
                        eventKey="10"
                        active={false}
                        onClick={() => setIsInput(true)}>
                        10+
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}

            <div className="btn-separator bg-secondary opacity-25"></div>

            <div className="d-flex">
              <Button
                variant="link"
                className="p-0 text-decoration-none link-success"
                onClick={removeFromBasket}>
                Delete
              </Button>
            </div>

            <div className="btn-separator bg-secondary opacity-25"></div>

            <div className="d-flex">
              <Button
                disabled
                variant="link"
                className="p-0 text-decoration-none link-success">
                Save for later
              </Button>
            </div>

            <div className="btn-separator bg-secondary opacity-25"></div>

            <div className="d-flex">
              <Button
                disabled
                variant="link"
                className="p-0 text-decoration-none link-success">
                Compare with similar items
              </Button>
            </div>
          </div>
        </div>
      </Stack>

      {/* Control buttons on small screens */}
      <div
        id="cart-control-container"
        className="d-sm-none"
        style={{ fontSize: '.75rem' }}>
        {isInput ? (
          <Form
            className="d-inline-block flex-column align-items-start"
            onSubmit={handleQuantitySubmit}>
            <Form.Control
              ref={inputQuantityRef}
              maxLength={3}
              aria-label="Quantity"
              autoComplete="false"
              value={inputQuantity}
              onChange={handleQuantityChange}
              onFocus={() => setIsInputSubmitted(false)}
            />
            {inputQuantity && quantity !== Number(inputQuantity) && (
              <Button
                type="submit"
                variant="warning"
                className="rounded-3 mt-2 w-100">
                Update
              </Button>
            )}
          </Form>
        ) : (
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
            <Button variant="light" onClick={() => setShowModal(true)}>
              {quantity}
            </Button>
            <Button
              variant="light"
              onClick={() => updateProduct({ quantity: quantity + 1 })}>
              {'+'}
            </Button>
          </ButtonGroup>
        )}

        <div className="btn-container d-inline-block">
          <Button
            variant="link"
            className="p-0 text-decoration-none"
            onClick={removeFromBasket}>
            Delete
          </Button>
        </div>

        <div className="btn-container d-inline-block">
          <Button disabled variant="link" className="p-0 text-decoration-none">
            Save for later
          </Button>
        </div>

        <div className="btn-container d-inline-block">
          <Button disabled variant="link" className="p-0 text-decoration-none">
            Compare with similar items
          </Button>
        </div>

        <Modal
          centered
          scrollable
          show={showModal}
          aria-labelledby="Product Quantity"
          className="quantity-modal w-50 top-50 start-50 translate-middle"
          onHide={() => setShowModal(false)}>
          <Modal.Header closeButton className="px-4">
            <Modal.Title as="h4" className="fs-6 fw-bold">
              Quantity
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                eventKey="0"
                active={false}
                onClick={() => setShowModal(false) & removeFromBasket()}>
                0 (Delete)
              </ListGroup.Item>
              {Array(Math.min(9, inStock))
                .fill()
                .map((_, i) => (
                  <ListGroup.Item
                    action
                    key={i}
                    eventKey={i + 1}
                    active={i + 1 === quantity}
                    onClick={() =>
                      setShowModal(false) & updateProduct({ quantity: i + 1 })
                    }>
                    {i + 1}
                  </ListGroup.Item>
                ))}
              {inStock > 9 && (
                <ListGroup.Item
                  action
                  eventKey="10"
                  active={false}
                  onClick={() => setShowModal(false) & setIsInput(true)}>
                  10+
                </ListGroup.Item>
              )}
            </ListGroup>
          </Modal.Body>
        </Modal>
      </div>
    </Stack>
  );
}
export default CheckoutProduct;
