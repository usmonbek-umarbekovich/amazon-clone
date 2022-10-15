import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { useStateValue } from '../contexts/StateProvider';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import './style.css';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) signOut(auth);
  };

  return (
    <header className="header">
      {/* TODO add fixed top */}
      <Navbar variant="dark" className="px-2 py-1">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <img
              className="header__logo mt-2 me-2"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav__section" />
          <Navbar.Collapse id="nav__section">
            <Stack
              gap="3"
              direction="horizontal"
              className="align-items-center w-100">
              <InputGroup>
                <Form.Control
                  aria-label="Search products"
                  aria-describedby="search__btn"
                />
                <Button
                  id="search__btn"
                  className="border-0 d-flex text-body"
                  style={{ backgroundColor: '#febd69' }}>
                  <FaSearch className="fs-5 m-auto" />
                </Button>
              </InputGroup>
              <Nav className="d-flex align-items-center gap-2">
                <Nav.Link as={NavLink} to={!user && '/login'}>
                  <Stack
                    onClick={handleAuthentication}
                    className="text-white text-nowrap justify-content-center">
                    <p className="m-0" style={{ fontSize: '12px' }}>
                      Hello, {user?.email ?? 'Guest'}
                    </p>
                    <p className="fw-bold m-0" style={{ fontSize: '14px' }}>
                      {user ? 'Sign out' : 'Sign In'}
                    </p>
                  </Stack>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders">
                  <Stack className="text-white text-nowrap justify-content-center">
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
                <Nav.Link as={NavLink} to="/checkout">
                  <Stack
                    direction="horizontal"
                    className="text-white align-items-center">
                    <ShoppingBasketIcon className="me-2" />
                    <p className="fw-bold m-0" style={{ color: '#f08804' }}>
                      {basket.length}
                    </p>
                  </Stack>
                </Nav.Link>
              </Nav>
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;
