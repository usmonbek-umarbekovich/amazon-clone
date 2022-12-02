import { useState, useRef } from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import OrderProduct from './OrderProduct';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaChevronDown } from 'react-icons/fa';

function Order({ order }) {
  const [showAddress, setShowAddress] = useState(false);
  const addressTimeoutRef = useRef();

  const handleShowAddress = () => {
    clearTimeout(addressTimeoutRef.current);
    setShowAddress(true);
  };

  const handleHideAddress = () => {
    addressTimeoutRef.current = setTimeout(() => {
      setShowAddress(false);
    }, 500);
  };

  // TODO remove dummy data
  order.delivery = {
    recipient: 'Usmonbek Rustamov',
    date: 'October 20, 2022',
    address: {
      street: 'Olive St.',
      building: '13',
      apartment: '57',
      floor: '4',
      zip: '04127',
      city: 'California',
      country: 'USA',
      phone: '(209) 555-5555',
    },
  };

  const { recipient, date: delivery_date, address } = order.delivery;

  return (
    <Card className="order-container rounded-3 overflow-hidden mb-sm-4 mb-1">
      <Card.Header
        style={{ lineHeight: 1, backgroundColor: '#F0F2F2' }}
        className="d-none d-sm-block p-0">
        <Row
          style={{ padding: '0.875rem 1.125rem' }}
          className="row-cols-2 justify-content-between">
          <Col md={7} className="col-auto">
            <Row className="row-cols-3 flex-nowrap">
              <Col className="d-none d-md-block">
                <p
                  style={{ fontSize: '0.75rem' }}
                  className="text-uppercase mb-2">
                  Date of placing the order
                </p>
                <p
                  style={{ fontSize: '0.875rem' }}
                  className="text-nowrap mb-0">
                  {moment.unix(order.data.created).format('MMMM DD, YYYY')}
                </p>
              </Col>
              <Col className="col-auto">
                <p
                  style={{ fontSize: '0.75rem' }}
                  className="text-nowrap text-uppercase mb-2">
                  Sum
                </p>
                <CurrencyFormat
                  renderText={value => (
                    <p
                      style={{ fontSize: '0.875rem' }}
                      className="text-nowrap mb-0">
                      {value}
                    </p>
                  )}
                  decimalScale={2}
                  value={order.data.amount / 100}
                  displayType="text"
                  thousandSeperator={true}
                  prefix="USD "
                />
              </Col>
              <Col className="d-none d-md-block col-auto position-relative">
                <p
                  style={{ fontSize: '0.75rem' }}
                  className="text-nowrap text-uppercase mb-2">
                  Delivery Address
                </p>
                <Button
                  variant="link"
                  style={{ marginTop: '-0.35rem' }}
                  aria-label="Show delivery address"
                  className="text-nowrap text-decoration-none p-0 pb-2 mb-0"
                  onClick={handleShowAddress}
                  onMouseEnter={handleShowAddress}
                  onMouseLeave={handleHideAddress}>
                  {recipient}{' '}
                  <FaChevronDown
                    style={{ fontSize: '0.5rem' }}
                    className="link-secondary mb-2"
                  />
                </Button>
                <div
                  hidden={!showAddress}
                  aria-label="Delivery address"
                  style={{
                    marginTop: '-0.15rem',
                    minWidth: '15rem',
                    zIndex: '900',
                  }}
                  className="delivery-address-modal position-absolute top-100 start-50 translate-middle-x bg-white border rounded-3 p-3"
                  onMouseEnter={handleShowAddress}
                  onMouseLeave={handleHideAddress}>
                  <div style={{ fontSize: '0.875rem' }}>
                    <p className="text-nowrap mb-2 fw-bold">{recipient}</p>
                    <p className="text-nowrap mb-2">
                      {address.street} {address.building}
                    </p>
                    <p className="text-nowrap mb-2">
                      {address.apartment && `No. ${address.apartment}`}
                      {address.floor && `, Floor ${address.floor}`}
                    </p>
                    <p className="text-nowrap mb-2">
                      {address.zip} {address.city}
                    </p>
                    <p className="text-nowrap mb-2">{address.country}</p>
                    <p className="text-nowrap mb-0">
                      Phone number: {address.phone}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col className="col-auto d-flex flex-column align-items-end ms-auto">
            <div style={{ fontSize: '0.75rem' }} className="d-flex">
              <p className="text-uppercase mb-2 me-1">Order id</p>
              <p className="text-uppercase mb-2">{order.id.slice(7)}</p>
            </div>
            <div className="d-flex align-items-center">
              {/* TODO handle showing order details */}
              <Button variant="link" className="text-decoration-none p-0">
                View order details
              </Button>

              <div
                className="btn-separator bg-secondary opacity-25"
                style={{ height: '1rem' }}></div>

              {/* TODO handle showing invoice info */}
              <Button variant="link" className="text-decoration-none p-0">
                Invoice
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row className="flex-nowrap w-100 mx-auto">
          <Col className="ps-0">
            {/* TODO show relevant delivery date */}
            <h3
              style={{ fontSize: '1.125rem' }}
              className="d-none d-sm-block fw-bold m-0">
              Delivered on: {delivery_date}
            </h3>
            <div className="mt-sm-3 order-product-container">
              {order.data.basket.map(p => (
                <OrderProduct
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  image={p.image}
                  returnBy={p.returnBy}
                  deliveryDate={delivery_date}
                />
              ))}
            </div>
          </Col>
          <Col className="d-none d-md-block col-auto mt-3 pe-0">
            <div className="btn-container py-1 m-0 mb-3">
              {/* TODO handle track the shipment */}
              <Button
                variant="link"
                className="text-reset text-center text-nowrap text-decoration-none border-0 w-100 p-0">
                Track the shipment
              </Button>
            </div>
            <div className="btn-container py-1 m-0 mb-1">
              {/* TODO handle feedback */}
              <Button
                variant="link"
                className="text-reset text-center text-nowrap text-decoration-none border-0 w-100 p-0">
                Add feedback about the seller
              </Button>
            </div>
            <div className="btn-container py-1 m-0">
              {/* TODO handle writing product review */}
              <Button
                variant="link"
                className="text-reset text-center text-nowrap text-decoration-none border-0 w-100 p-0">
                Write a product review
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer
        style={{ padding: '0.875rem 1.125rem' }}
        className="d-none d-sm-block bg-white">
        {/* TODO handle archiving the order */}
        <Button variant="link" className="text-decoration-none p-0">
          {order.archived ? 'Archive the order' : 'Restore order from archive'}
        </Button>
      </Card.Footer>
    </Card>
  );
}
export default Order;
