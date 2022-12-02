import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BsArrowRepeat, BsHandbag, BsChevronRight } from 'react-icons/bs';

function OrderProduct({ id, title, image, returnBy, deliveryDate }) {
  returnBy = 'October 23, 2022';

  return (
    <Row className="order-product align-items-center align-items-sm-start">
      <Col className="col-3 h-100">
        <img
          src={image}
          alt={title}
          className="w-100 h-100"
          style={{ objectFit: 'contain' }}
        />
      </Col>
      <Col className="d-flex flex-column">
        <div className="d-none d-sm-block">
          {/* TODO redirect to product page */}
          <Link
            to="#"
            style={{ fontSize: '0.875rem' }}
            className="link-success text-decoration-none truncate-lines lines-2">
            {title}
          </Link>
          {/* TODO add data dynamically */}
          <p style={{ fontSize: '0.75rem' }}>
            The return period expires on {returnBy}
          </p>
        </div>

        <div className="d-sm-none d-flex flex-column justify-content-center">
          <h2
            style={{ fontSize: '1rem' }}
            className="fw-bold truncate-lines lines-1 mb-1">
            {title}
          </h2>
          {/* TODO handle delivery date */}
          <p style={{ fontSize: '0.85rem' }} className="mb-0">
            Delivered on: {deliveryDate}
          </p>
        </div>

        <div className="d-none d-sm-flex flex-wrap">
          <div className="btn-container bg-warning border-warning py-1 m-0 me-1 mb-1">
            {/* TODO handle buying the product again */}
            <Button
              variant="link"
              className="text-reset text-center text-decoration-none border-0 w-100 ps-1 p-0">
              <div className="d-inline position-relative me-lg-4 me-3">
                <BsArrowRepeat className="position-absolute top-50 start-50 translate-middle fs-3" />
                <BsHandbag
                  style={{ fontSize: '0.65rem', marginTop: '-0.05rem' }}
                  className="position-absolute top-50 start-50 translate-middle"
                />
              </div>
              <span>Buy this product again</span>
            </Button>
          </div>
          <div className="btn-container py-1 m-0 me-1 mb-1">
            {/* TODO handle viewing the product */}
            <Button
              variant="link"
              className="text-reset text-center text-decoration-none border-0 w-100 p-0">
              View your product
            </Button>
          </div>
        </div>
      </Col>
      <Col className="d-sm-none col-auto px-0">
        {/* TODO handle showing order/product info */}
        <Link to="#" className="stretched-link text-reset">
          <BsChevronRight />
        </Link>
      </Col>
    </Row>
  );
}

export default OrderProduct;
