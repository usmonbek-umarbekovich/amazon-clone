import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import OrderProduct from './OrderProduct';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Order({ order }) {
  order.delivery_date = 'October 20, 2022';

  return (
    <Card id="order-container" className="rounded-3 overflow-hidden mb-4">
      <Card.Header
        style={{ lineHeight: 1, backgroundColor: '#F0F2F2' }}
        className="p-0">
        <Row style={{ padding: '0.875rem 1.125rem' }} className="row-cols-2">
          <Col>
            <Row className="row-cols-3">
              <div>
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
              </div>
              <div>
                <p
                  style={{ fontSize: '0.75rem' }}
                  className="text-uppercase mb-2">
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
              </div>
              <div>
                <p
                  style={{ fontSize: '0.75rem' }}
                  className="text-uppercase mb-2">
                  Delivery Address
                </p>
                <Button
                  variant="link"
                  className="text-nowrap text-decoration-none p-0 mb-0">
                  Usmonbek Rustamov
                </Button>
              </div>
            </Row>
          </Col>

          <Col className="d-flex flex-column flex-grow-1 align-items-end">
            <div style={{ fontSize: '0.75rem' }} className="d-flex">
              <p className="text-uppercase mb-2 me-1">Order id</p>
              <p className="text-uppercase mb-2">{order.id.slice(7)}</p>
            </div>
            <div className="d-flex align-items-center">
              <Button variant="link" className="text-decoration-none p-0">
                View order details
              </Button>

              <div
                className="btn-separator bg-secondary opacity-25"
                style={{ height: '1rem' }}></div>

              <Button variant="link" className="text-decoration-none p-0">
                Invoice
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body style={{ padding: '0.875rem 1.125rem' }}>
        <Row>
          <Col className="col-9">
            <h3 style={{ fontSize: '1.125rem' }} className="fw-bold m-0">
              Delivered on: {order.delivery_date}
            </h3>
            <div className="mt-3">
              {order.data.basket.map(p => (
                <OrderProduct
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  image={p.image}
                  returnBy={p.returnBy}
                />
              ))}
            </div>
          </Col>
          <Col className="col-3 mt-3">
            <div className="btn-container py-1 m-0 mb-3">
              <Button
                variant="link"
                className="text-reset text-center text-decoration-none border-0 w-100 p-0">
                Track the shipment
              </Button>
            </div>
            <div className="btn-container py-1 m-0 mb-1">
              <Button
                variant="link"
                className="text-reset text-center text-decoration-none border-0 w-100 p-0">
                Add feedback about the seller
              </Button>
            </div>
            <div className="btn-container py-1 m-0">
              <Button
                variant="link"
                className="text-reset text-center text-decoration-none border-0 w-100 p-0">
                Write a product review
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer
        style={{ padding: '0.875rem 1.125rem' }}
        className="bg-white">
        <Button variant="link" className="text-decoration-none p-0">
          Archive the order
        </Button>
      </Card.Footer>
    </Card>
  );
}
export default Order;
