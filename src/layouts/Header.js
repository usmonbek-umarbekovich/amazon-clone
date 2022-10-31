import { useState, useEffect, useRef } from 'react';
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
  const [navHeight, setNavHeight] = useState(() =>
    window.innerWidth < 768 ? 97.5625 : 62.1562
  );
  const navRef = useRef();

  useEffect(() => {
    if (!navRef.current) return;
    setNavHeight(navRef.current.getBoundingClientRect().height);

    const controller = new AbortController();
    window.addEventListener(
      'resize',
      () => {
        setNavHeight(navRef.current.getBoundingClientRect().height);
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  }, []);

  return (
    <header style={{ marginTop: `${navHeight}px` }}>
      <Navbar
        ref={navRef}
        expand="md"
        variant="dark"
        fixed="top"
        style={{ backgroundColor: '#131921', padding: '.35rem 0' }}>
        <Container fluid className="d-flex">
          <Stack className="w-100 flex-md-row align-items-md-center">
            <Stack direction="horizontal" className="align-items-center">
              <Navbar.Toggle
                disabled
                className="border-0 p-0 me-2"
                style={{ marginTop: '-0.5rem' }}
              />

              <Navbar.Brand
                as={NavLink}
                to="/"
                className="px-sm-2 py-md-1 pb-0 outline">
                <img
                  className="px-2 px-sm-0 mb-1 mb-sm-0 mt-md-2"
                  style={{ width: '6rem', objectFit: 'contain' }}
                  src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="logo"
                />
              </Navbar.Brand>

              <Stack
                direction="horizontal"
                className="d-md-none align-items-center ms-auto">
                <Nav.Link
                  as={NavLink}
                  to={!user && '/login'}
                  style={{ padding: '.65rem .5rem' }}
                  className="text-white outline">
                  <Stack
                    direction="horizontal"
                    className="align-items-center"
                    onClick={() => user && setShowUserLinks(true)}>
                    <p
                      className="m-0 text-nowrap"
                      style={{
                        lineHeight: 0,
                        fontSize: '14px',
                        fontWeight: user ? '500' : '400',
                      }}>
                      {/* TODO temporary split */}
                      <span>{user?.email.split('@')[0] ?? 'Sign In'}</span>
                      <MdKeyboardArrowRight />
                    </p>
                    <FaRegUser className="fs-5" />
                  </Stack>
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/checkout"
                  className="text-white px-2 py-2 outline">
                  <Stack direction="horizontal" className="align-items-center">
                    <MdShoppingBasket className="fs-3 me-2" />
                    <p className="fw-bold m-0" style={{ color: '#f08804' }}>
                      {basket.length > 99 ? '99+' : basket.length}
                    </p>
                  </Stack>
                </Nav.Link>
              </Stack>
            </Stack>

            <InputGroup
              style={{ marginTop: '.35rem' }}
              className="mb-1 my-md-0">
              <Form.Control
                aria-label="Search products"
                aria-describedby="search-btn"
                style={{ boxShadow: 'none', border: 'none' }}
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
            className="w-75"
            backdropClassName="opacity-75"
            show={showUserLinks}
            onHide={() => setShowUserLinks(false)}>
            <Offcanvas.Header
              style={{ backgroundColor: '#232f3e' }}
              className="flex-column">
              <Stack
                direction="horizontal"
                className="justify-content-between position-relative mb-3">
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
                {/* TODO temporary split */}
                <p className="pb-2">Hello, {user?.email.split('@')[0]}</p>
                <p className="fs-3 fw-normal">Your Account</p>
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="px-0">
              <Nav>
                {/* Nav section on large screens */}
                <Stack
                  direction="horizontal"
                  className="d-none d-md-flex align-items-center">
                  <Nav.Link
                    as={NavLink}
                    to={!user && '/login'}
                    style={{ padding: '.35rem .5rem' }}
                    className="text-white ms-3 me-1 outline">
                    <Stack
                      className="text-nowrap justify-content-center"
                      onClick={() => user && signOut(auth)}>
                      <p className="m-0" style={{ fontSize: '12px' }}>
                        {/* TODO temporary split */}
                        Hello, {user?.email.split('@')[0] ?? 'Guest'}
                      </p>
                      <p className="fw-bold m-0" style={{ fontSize: '14px' }}>
                        {user ? 'Sign out' : 'Sign In'}
                      </p>
                    </Stack>
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/orders"
                    style={{ padding: '.35rem .5rem' }}
                    className="text-white me-1 outline">
                    <Stack className="text-nowrap justify-content-center">
                      <p className="m-0" style={{ fontSize: '12px' }}>
                        Returns
                      </p>
                      <p className="fw-bold m-0" style={{ fontSize: '14px' }}>
                        & Orders
                      </p>
                    </Stack>
                  </Nav.Link>

                  <Stack
                    style={{ cursor: 'pointer', padding: '.35rem .5rem' }}
                    className="text-white text-nowrap justify-content-center me-1 outline">
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
                    style={{ padding: '.7rem .5rem' }}
                    className="text-white outline">
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
                <Stack className="d-md-none">
                  <Stack
                    direction="horizontal"
                    className="d-md-none justify-content-between px-3 mb-3">
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
                    className="w-100 bg-secondary bg-opacity-25 mb-3"></div>

                  <p className="fs-4 mb-3 px-3" style={{ fontWeight: 500 }}>
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
