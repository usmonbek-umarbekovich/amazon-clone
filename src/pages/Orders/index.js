import { useEffect, useState, useMemo } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useUserContext } from '../../contexts/UserProvider';

import { PERIODS } from '../../config/constants';
import { db } from '../../config/firebase';

import Order from '../../components/Orders/Order';
import OrderFilterModal from '../../components/Orders/OrderFilterModal';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';

import { FaSearch, FaChevronRight } from 'react-icons/fa';
import './style.css';

function Orders() {
  const user = useUserContext();

  const [orders, setOrders] = useState([]);
  const [activeNavKey, setActiveNavKey] = useState('orders');
  const [periodIndex, setPeriodIndex] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const haveArchive = useMemo(
    () => orders.some(order => order.archived),
    [orders]
  );

  const selectedOrders = useMemo(() => {
    if (PERIODS[periodIndex].name === 'year') {
      return orders.filter(order => {
        const date = new Date(order.data.created * 1000);
        return date.getFullYear() === PERIODS[periodIndex].value;
      });
    }

    if (PERIODS[periodIndex].name === 'month') {
      return orders.filter(order => {
        const date = new Date(order.data.created * 1000);
        const curr = new Date();
        const yearDiff = curr.getFullYear() - date.getFullYear();
        const monthDiff = curr.getMonth() - date.getMonth();
        return monthDiff + 12 * yearDiff < 3;
      });
    }

    if (PERIODS[periodIndex].name === 'day') {
      return orders.filter(order => {
        const date = new Date(order.data.created * 1000);
        const curr = new Date();
        const monthDiff = curr.getMonth() - date.getMonth();
        const dayDiff = curr.getDate() - date.getDate();
        return dayDiff + 30 * monthDiff < 30;
      });
    }

    if (PERIODS[periodIndex].name === 'archive') {
      return orders.filter(order => order.archived);
    }

    return [...orders];
  }, [orders, periodIndex]);

  // Use Effects
  useEffect(() => {
    switch (activeNavKey) {
      case 'orders':
        document.title = 'Your Orders';
        break;
      case 'buy-again':
        document.title = 'Buy Again';
        break;
      case 'not-shipped-yet':
        document.title = 'Not Shipped Yet';
        break;
      case 'canceled-orders':
        document.title = 'Canceled Orders';
        break;
      default:
        document.title = 'Amazon.com. Spend less. Smile more.';
        break;
    }
  }, [activeNavKey]);

  useEffect(() => {
    if (!user) return setOrders([]);

    const ordersRef = collection(db, 'users', user.uid, 'orders');
    const q = query(ordersRef, orderBy('created', 'desc'));
    onSnapshot(q, snapshot => {
      setOrders(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [user]);

  return (
    <main id="orders" className="bg-white w-100 h-100">
      <div className="d-flex flex-column col-lg-9 col-md-11 px-sm-3 px-md-0 py-sm-2 mx-auto">
        <header className="d-none d-sm-block">
          <Breadcrumb>
            <Breadcrumb.Item
              href="#"
              title="Your Account"
              linkProps={{ className: 'text-decoration-none link-success' }}>
              Your Account
            </Breadcrumb.Item>
            <Breadcrumb.Item active title="Your Orders">
              Your Orders
            </Breadcrumb.Item>
          </Breadcrumb>
        </header>

        <section
          id="orders-search-section"
          className="mb-sm-2 order-1 order-sm-0">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="d-none d-sm-block fs-3">Your Orders</h1>
            {/* TODO search orders */}
            <Form className="d-flex col-md-6 col-sm-8 col-12">
              <Form.Group
                controlId="searchOrders"
                className="position-relative flex-grow-1 me-sm-2">
                <Form.Label visuallyHidden>Order name</Form.Label>
                <Form.Control
                  size="sm"
                  type="search"
                  name="orderName"
                  placeholder="Search all orders"
                  aria-label="Order name"
                />

                <FaSearch className="position-absolute top-50 translate-middle-y" />

                <Button
                  variant="link"
                  style={{ right: '0.5rem', fontSize: '0.875rem' }}
                  className="d-sm-none position-absolute top-50 translate-middle-y p-2 pe-0 text-reset text-decoration-none border-start bg-white"
                  onClick={() => setShowFilters(true)}>
                  <span
                    style={{ fontSize: '0.9375rem' }}
                    className="me-2 fw-semibold">
                    Filter
                  </span>
                  <FaChevronRight style={{ fontSize: '0.9375rem' }} />
                </Button>
              </Form.Group>

              <Button
                size="sm"
                variant="dark"
                aria-label="Search Orders"
                className="d-none d-sm-inline-block rounded-pill text-nowrap fw-bold">
                Search Orders
              </Button>
            </Form>
          </div>
        </section>

        <section
          id="orders-navigation-section"
          className="mb-sm-3 order-0 order-sm-1">
          <Nav
            as="ul"
            activeKey={activeNavKey}
            onSelect={eventKey => setActiveNavKey(eventKey)}>
            <Nav.Item as="li" className="me-3">
              {activeNavKey === 'orders' ? (
                <>
                  <h3 className="d-none d-sm-block fw-bold border-bottom border-3 border-warning p-2">
                    Orders
                  </h3>
                  <Nav.Link
                    eventKey="orders"
                    className="d-sm-none fw-bold border-bottom border-3 border-primary p-2">
                    Your Orders
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link eventKey="orders" className="link-success p-2">
                  <span className="d-none d-sm-inline link-success">
                    Orders
                  </span>
                  <span className="d-sm-none link-dark">Your Orders</span>
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Item as="li" className="me-3">
              {activeNavKey === 'buy-again' ? (
                <>
                  <h3 className="d-none d-sm-block fw-bold border-bottom border-3 border-warning p-2">
                    Buy again
                  </h3>
                  <Nav.Link
                    eventKey="buy-again"
                    className="d-sm-none fw-bold border-bottom border-3 border-primary p-2">
                    Buy again
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link eventKey="buy-again" className="p-2">
                  <span className="d-none d-sm-inline link-success">
                    Buy again
                  </span>
                  <span className="d-sm-none link-dark">Buy again</span>
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Item as="li" className="me-3 d-none d-sm-block">
              {activeNavKey === 'not-shipped-yet' ? (
                <h3 className="fw-bold border-bottom border-3 border-warning p-2">
                  Not shipped yet
                </h3>
              ) : (
                <Nav.Link
                  eventKey="not-shipped-yet"
                  className="link-success p-2">
                  Not shipped yet
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Item as="li" className="me-3 d-none d-sm-block">
              {activeNavKey === 'canceled-orders' ? (
                <h3 className="fw-bold border-bottom border-3 border-warning p-2">
                  Canceled orders
                </h3>
              ) : (
                <Nav.Link
                  eventKey="canceled-orders"
                  className="link-success p-2">
                  Canceled orders
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </section>

        {activeNavKey === 'orders' && (
          <section id="orders-period-section" className="mb-sm-3 order-2">
            <div className="d-sm-none">
              <p className="text-secondary text-center fw-bold my-1">
                {PERIODS[periodIndex].label}
              </p>
            </div>

            <div className="d-none d-sm-flex align-items-center">
              <p className="me-2 mb-0">
                <span className="fw-bold">
                  {selectedOrders.length} order
                  {selectedOrders.length > 1 ? 's' : ''}
                </span>{' '}
                placed in
              </p>

              <Dropdown>
                <Dropdown.Toggle
                  size="sm"
                  aria-label="Choose a time period"
                  style={{
                    fontSize: '0.8125rem',
                    backgroundColor: '#f0f2f2',
                    boxShadow: '0 2px 5px 0 rgb(213 217 217 / 50%)',
                  }}
                  className="rounded-2 border-secondary border-opacity-25 text-dark">
                  {PERIODS[periodIndex].label}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cart-product-quantity-menu">
                  {PERIODS.slice(0, PERIODS.length - 1).map((p, idx) => (
                    <Dropdown.Item
                      key={idx}
                      eventKey={idx}
                      active={periodIndex === idx}
                      onClick={() => setPeriodIndex(idx)}>
                      {p.label}
                    </Dropdown.Item>
                  ))}
                  {haveArchive && (
                    <Dropdown.Item
                      eventKey={PERIODS.length - 1}
                      active={periodIndex === PERIODS.length - 1}
                      onClick={() => setPeriodIndex(PERIODS.length - 1)}>
                      Archived orders
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </section>
        )}

        {activeNavKey === 'orders' && (
          <section
            id="orders-section"
            className="order-last border-top border-2">
            {selectedOrders.map(order => (
              <Order key={order.id} order={order} />
            ))}
            {selectedOrders.length === 0 && (
              <div
                style={{ fontSize: '0.875rem' }}
                className="text-center pt-sm-3 px-2 py-5">
                <span>
                  You have not placed any orders in {PERIODS[periodIndex].label}
                  .
                </span>{' '}
                {(periodIndex < PERIODS.length - 2 ||
                  (periodIndex === PERIODS.length - 2 && haveArchive)) && (
                  <Button
                    variant="link"
                    className="text-decoration-none p-0 pb-1"
                    onClick={() => setPeriodIndex(periodIndex + 1)}>
                    View orders in {PERIODS[periodIndex + 1].label}
                  </Button>
                )}
              </div>
            )}
          </section>
        )}

        {activeNavKey === 'buy-again' && (
          <section
            id="buy-again-section"
            className="order-last border-top border-2">
            {/* TODO show relevant items */}
            <div
              style={{ fontSize: '0.875rem' }}
              className="text-center pt-sm-3 px-2 py-5">
              <span>
                There are no recommended items for you to buy again at this
                time. Check
              </span>{' '}
              <Button
                variant="link"
                className="text-decoration-none p-0 pb-1"
                onClick={() => setActiveNavKey('orders')}>
                Your Orders
              </Button>{' '}
              <span>for items you previously purchased.</span>
            </div>
          </section>
        )}

        {activeNavKey === 'not-shipped-yet' && (
          <section
            id="not-shipped-yet-section"
            className="order-last border-top border-2">
            {/* TODO show relevant items */}
            <div
              style={{ fontSize: '0.875rem' }}
              className="text-center pt-sm-3 px-2 py-5">
              <span>
                Looking for an order? All of your orders have shipped.
              </span>{' '}
              <Button
                variant="link"
                className="text-decoration-none p-0 pb-1"
                onClick={() => setActiveNavKey('orders')}>
                View all orders
              </Button>
            </div>
          </section>
        )}

        {activeNavKey === 'canceled-orders' && (
          <section
            id="canceled-orders-section"
            className="order-last border-top border-2">
            {/* TODO show relevant items */}
            <div
              style={{ fontSize: '0.875rem' }}
              className="text-center pt-sm-3 px-2 py-5">
              <span>
                We aren't finding any cancelled orders (for orders placed in{' '}
                {PERIODS[periodIndex].label.startsWith('last')
                  ? `the ${PERIODS[periodIndex].label}`
                  : PERIODS[periodIndex].label}
                ).
              </span>{' '}
              <Button
                variant="link"
                className="text-decoration-none p-0 pb-1"
                onClick={() => setActiveNavKey('orders')}>
                View all orders
              </Button>
            </div>
          </section>
        )}
      </div>

      {/* Filters window (on small screens) */}
      <OrderFilterModal
        show={showFilters}
        haveArchive={haveArchive}
        orderTypeInitial={activeNavKey}
        orderDateIndexInitial={periodIndex}
        setActiveNavKey={setActiveNavKey}
        setPeriodIndex={setPeriodIndex}
        onHide={() => setShowFilters(false)}
      />
    </main>
  );
}
export default Orders;
