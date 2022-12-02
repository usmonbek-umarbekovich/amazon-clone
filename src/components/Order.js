import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import OrderProduct from './OrderProduct';
import Popup from './Popup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Order({ order }) {
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
    <Card className="order-container border-bottom border-1 rounded-0 mb-sm-4 mb-1">
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
              <Col className="d-none d-md-block col-auto">
                <p
                  style={{ fontSize: '0.75rem' }}
                  className="text-nowrap text-uppercase mb-2">
                  Delivery Address
                </p>
                <Popup>
                  <Popup.Toggle
                    showOnClick
                    showOnMouseEnter
                    hideOnMouseLeave
                    aria-label="Show delivery address"
                    className="link-success">
                    {recipient}
                  </Popup.Toggle>
                  <Popup.Body
                    showOnMouseEnter
                    hideOnMouseLeave
                    aria-label="Delivery address"
                    className="start-50 translate-middle-x">
                    <div>
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
                  </Popup.Body>
                </Popup>
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
              <Button
                variant="link"
                className="link-success text-decoration-none p-0 pb-2"
                style={{ marginTop: '-0.35rem' }}>
                View order details
              </Button>

              <div
                className="btn-separator bg-secondary opacity-25"
                style={{ height: '1rem', marginTop: '-0.75rem' }}></div>

              <Popup>
                <Popup.Toggle
                  showOnClick
                  aria-label="Show invoice info"
                  className="link-success"
                  iconClassName="text-secondary">
                  Invoice
                </Popup.Toggle>
                <Popup.Body
                  closeButton
                  aria-label="Invoice info"
                  style={{ right: '-2rem', '--icon-left': '72.5%' }}>
                  <ul className="lh-base ps-3 mb-0">
                    <li>
                      <Link className="link-success text-decoration-none">
                        Order summary
                      </Link>
                    </li>
                    <li>
                      <Link className="link-success text-decoration-none">
                        invoice 1
                      </Link>
                    </li>
                    <li>
                      <Link className="link-success text-decoration-none">
                        Request an invoice from a reseller
                      </Link>
                    </li>
                  </ul>
                </Popup.Body>
              </Popup>
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
        <Button
          variant="link"
          className="link-success text-decoration-none p-0">
          {order.archived ? 'Restore order from archive' : 'Archive the order'}
        </Button>
      </Card.Footer>
    </Card>
  );
}
export default Order;
