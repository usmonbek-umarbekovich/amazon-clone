import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useStateValue } from '../contexts/StateProvider';
import { db } from '../config';
import Order from '../components/Order';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import { FaSearch, FaChevronRight } from 'react-icons/fa';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [activeNavKey, setActiveNavKey] = useState('orders');

  useEffect(() => {
    document.title = 'My orders';
  }, []);

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
              title="My account"
              linkProps={{ className: 'text-decoration-none link-success' }}>
              My account
            </Breadcrumb.Item>
            <Breadcrumb.Item active title="My orders">
              My orders
            </Breadcrumb.Item>
          </Breadcrumb>
        </header>

        <section id="orders-search-section" className="mb-sm-2 order-1 order-sm-0">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="d-none d-sm-block fs-3">My orders</h1>
            <Form className="d-flex col-md-6 col-sm-8 col-12">
              <Form.Group
                controlId="searchOrders"
                className="position-relative flex-grow-1 me-sm-2">
                <Form.Label visuallyHidden>Order name</Form.Label>
                <Form.Control
                  size="sm"
                  type="search"
                  name="orderName"
                  id="orderName"
                  placeholder="All orders"
                  aria-label="Order name"
                  style={{ paddingLeft: '1.75rem' }}
                />
                <FaSearch
                  style={{ left: '0.5rem', fontSize: '0.875rem' }}
                  className="position-absolute top-50 translate-middle-y"
                />
                <Button
                  variant="link"
                  style={{ right: '0.5rem', fontSize: '0.875rem' }}
                  className="d-sm-none position-absolute top-50 translate-middle-y p-0 ps-2 text-reset text-decoration-none border-start">
                  <span style={{ fontSize: '0.875rem' }} className="me-2">
                    Filter
                  </span>
                  <FaChevronRight style={{ fontSize: '0.875rem' }} />
                </Button>
              </Form.Group>
              <Button
                size="sm"
                variant="dark"
                aria-labelledby="Search for order"
                className="d-none d-sm-inline-block rounded-pill text-nowrap fw-bold">
                Search for orders
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
                <h3 className="fw-bold border-bottom border-2 border-warning p-2 mb-0">
                  Orders
                </h3>
              ) : (
                <Nav.Link eventKey="orders" className="link-success p-2">
                  Orders
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item as="li" className="me-3">
              {activeNavKey === 'buy-again' ? (
                <h3 className="fw-bold border-bottom border-2 border-warning p-2 mb-0">
                  Buy again
                </h3>
              ) : (
                <Nav.Link eventKey="buy-again" className="link-success p-2">
                  Buy again
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item as="li" className="me-3 d-none d-sm-block">
              {activeNavKey === 'not-shipped-yet' ? (
                <h3 className="fw-bold border-bottom border-2 border-warning p-2 mb-0">
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
                <h3 className="fw-bold border-bottom border-2 border-warning p-2 mb-0">
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

        <section id="orders-date-section" className="mb-sm-3 order-2">
          <div className="d-sm-none">
            <p className="text-secondary text-center fw-semibold mb-0">Last three months</p>
          </div>
          <div className="d-none d-sm-flex align-items-center">
            <p className="me-2 mb-0">
              <span className="fw-bold">1 order</span> placed in
            </p>
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                style={{
                  fontSize: '0.8125rem',
                  backgroundColor: '#f0f2f2',
                  boxShadow: '0 2px 5px 0 rgb(213 217 217 / 50%)',
                }}
                className="rounded-2 border-secondary border-opacity-25 text-dark">
                last 3 months
              </Dropdown.Toggle>
              <Dropdown.Menu className="cart-product-quantity-menu">
                <Dropdown.Item eventKey="30-day">last 30 days</Dropdown.Item>
                <Dropdown.Item eventKey="3-month">last 3 months</Dropdown.Item>
                <Dropdown.Item eventKey="2022-year">2022</Dropdown.Item>
                <Dropdown.Item eventKey="2021-year">2021</Dropdown.Item>
                <Dropdown.Item eventKey="2020-year">2020</Dropdown.Item>
                <Dropdown.Item eventKey="archive">
                  Archived orders
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </section>

        <section id="orders-section" className="order-last border-top border-2">
          {orders?.map(order => (
            <Order key={order.id} order={order} />
          ))}
        </section>
      </div>
    </main>
  );
}
export default Orders;
