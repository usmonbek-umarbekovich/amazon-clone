import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function OrderProduct({ id, title, image, returnBy }) {
  returnBy = 'October 23, 2022';

  return (
    <Row style={{ height: '8rem' }} className="mb-5">
      <Col className="col-3 h-100">
        <img
          src={image}
          alt={title}
          className="w-100 h-100"
          style={{ objectFit: 'contain' }}
        />
      </Col>
      <Col className="d-flex flex-column">
        <a
          href="#"
          style={{ fontSize: '0.875rem' }}
          className="text-decoration-none">
          {title}
        </a>
        <p style={{ fontSize: '0.75rem' }}>
          The return period expires on {returnBy}
        </p>
        <div className="d-flex mt-auto">
          <div className="btn-container bg-warning border-warning py-1 m-0 me-1">
            <Button
              variant="link"
              className="text-reset text-center text-decoration-none border-0 w-100 p-0">
              Buy this product again
            </Button>
          </div>
          <div className="btn-container py-1 m-0">
            <Button
              variant="link"
              className="text-reset text-center text-decoration-none border-0 w-100 p-0">
              View your product
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default OrderProduct;
