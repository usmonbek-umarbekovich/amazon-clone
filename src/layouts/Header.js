import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { useStateValue } from '../contexts/StateProvider';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaBars, FaRegUser, FaSearch } from 'react-icons/fa';
import {
  MdClose,
  MdShoppingBasket,
  MdKeyboardArrowRight,
} from 'react-icons/md';

function Header() {
  const [{ basket, user }] = useStateValue();
  const [showUserLinks, setShowUserLinks] = useState(false);

  return (
    <header style={{ backgroundColor: '#131921' }} className="header">
      {/* TODO add fixed top */}
      <Navbar expand="md" variant="dark" className="px-md-4 py-md-2 px-3 pb-3">
        <Container fluid className="d-flex gap-4 p-0">
          <Stack
            gap={{ md: 4 }}
            className="w-100 gap-2 flex-md-row align-items-md-center">
            <Stack
              gap="3"
              direction="horizontal"
              className="align-items-center">
              <Navbar.Toggle
                disabled
                className="border-0 p-0 me-0"
                style={{ marginTop: '-0.3rem' }}
              />

              <Navbar.Brand as={NavLink} to="/" className="m-0 p-0 mt-2">
                <img
                  style={{ width: '6rem', objectFit: 'contain' }}
                  src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="logo"
                />
              </Navbar.Brand>

              <Stack
                gap="3"
                direction="horizontal"
                className="d-md-none align-items-center ms-auto">
                <Nav.Link as={NavLink} to={!user && '/login'} className="px-0">
                  <Stack
                    gap="2"
                    direction="horizontal"
                    className="text-white align-items-center"
                    onClick={() => user && setShowUserLinks(true)}>
                    <p
                      className="m-0"
                      style={{
                        fontSize: '14px',
                        fontWeight: user ? '500' : '400',
                      }}>
                      <span>{user ? user.email : 'Sign In'}</span>
                      <MdKeyboardArrowRight />
                    </p>
                    <FaRegUser className="fs-5" />
                  </Stack>
                </Nav.Link>

                <Nav.Link as={NavLink} to="/checkout" className="px-0">
                  <Stack
                    direction="horizontal"
                    className="text-white align-items-center">
                    <MdShoppingBasket className="fs-3 me-2" />
                    <p className="fw-bold m-0" style={{ color: '#f08804' }}>
                      {basket.length > 99 ? '99+' : basket.length}
                    </p>
                  </Stack>
                </Nav.Link>
              </Stack>
            </Stack>

            <InputGroup>
              <Form.Control
                aria-label="Search products"
                aria-describedby="search-btn"
              />
              <Button
                id="search-btn"
                className="border-0 d-flex text-body"
                style={{ backgroundColor: '#febd69' }}>
                <FaSearch className="fs-5 m-auto" />
              </Button>
            </InputGroup>
          </Stack>
          <Navbar.Offcanvas
            id="product-links"
            aria-labelledby="user-canvas"
            placement="end"
            backdropClassName="opacity-75"
            show={showUserLinks}
            onHide={() => setShowUserLinks(false)}>
            <Offcanvas.Header
              style={{ backgroundColor: '#232f3e' }}
              className="flex-column gap-3">
              <Stack
                direction="horizontal"
                className="justify-content-between position-relative">
                <Button
                  style={{ left: '-4.5rem' }}
                  className="position-absolute top-50 bg-transparent link-light border-0"
                  onClick={() => setShowUserLinks(false)}>
                  <MdClose className="fs-1" />
                </Button>
                <Button
                  disabled
                  className="ms-auto bg-transparent p-1 border-0">
                  Browse <FaBars />
                </Button>
              </Stack>

              <Offcanvas.Title
                id="user-canvas"
                style={{ lineHeight: 0 }}
                className="text-white me-auto">
                <p className="pb-2">Hello, {user?.email}</p>
                <p className="fs-3 fw-normal">Your Account</p>
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="px-0">
              <Nav>
                {/* Nav section on large screens */}
                <Stack
                  gap="4"
                  direction="horizontal"
                  className="d-none d-md-flex align-items-center">
                  <Nav.Link
                    as={NavLink}
                    to={!user && '/login'}
                    className="px-0 text-white">
                    <Stack
                      className="text-nowrap justify-content-center"
                      onClick={() => user && signOut(auth)}>
                      <p className="m-0" style={{ fontSize: '12px' }}>
                        Hello, {user?.email ?? 'Guest'}
                      </p>
                      <p className="fw-bold m-0" style={{ fontSize: '14px' }}>
                        {user ? 'Sign out' : 'Sign In'}
                      </p>
                    </Stack>
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/orders"
                    className="px-0 text-white">
                    <Stack className="text-nowrap justify-content-center">
                      <p className="m-0" style={{ fontSize: '12px' }}>
                        Returns
                      </p>
                      <p className="fw-bold m-0" style={{ fontSize: '14px' }}>
                        & Orders
                      </p>
                    </Stack>
                  </Nav.Link>

                  <Stack className="text-white text-nowrap justify-content-center">
                    <p className="m-0" style={{ fontSize: '12px' }}>
                      Your
                    </p>
                    <p className="fw-bold m-0" style={{ fontSize: '14px' }}>
                      Prime
                    </p>
                  </Stack>

                  <Nav.Link
                    as={NavLink}
                    to="/checkout"
                    className="px-0 text-white">
                    <Stack
                      direction="horizontal"
                      className="align-items-center">
                      <MdShoppingBasket className="fs-3 me-2" />
                      <p className="fw-bold m-0" style={{ color: '#f08804' }}>
                        {basket.length > 99 ? '99+' : basket.length}
                      </p>
                    </Stack>
                  </Nav.Link>
                </Stack>

                {/* Canvas Section on small screens */}
                <Stack gap="3" className="d-md-none">
                  <Stack
                    direction="horizontal"
                    className="d-md-none px-3 justify-content-between">
                    <p className="fs-4 m-0" style={{ fontWeight: 500 }}>
                      Your Orders
                    </p>
                    <Button
                      as={NavLink}
                      to="/orders"
                      variant="outline-info px-1 py-0">
                      See All
                    </Button>
                  </Stack>

                  <div
                    style={{ padding: '2px 0' }}
                    className="w-100 bg-secondary bg-opacity-25"></div>

                  <p className="fs-4 m-0 px-3" style={{ fontWeight: 500 }}>
                    Settings
                  </p>

                  <Button
                    variant="outline-secondary"
                    style={{ fontSize: '17px' }}
                    className="rounded-0 border-0 text-start text-black px-3"
                    onClick={() => signOut(auth) && setShowUserLinks(false)}>
                    Sign Out
                  </Button>
                </Stack>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;
