import { useState, useEffect } from 'react';
import { PERIODS } from '../../config/constants';

import FormCheck from 'react-bootstrap/FormCheck';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { FaChevronLeft } from 'react-icons/fa';
import './style.css';

function OrderFilterModal({
  show,
  onHide,
  haveArchive,
  orderTypeInitial,
  orderDateIndexInitial,
  setActiveNavKey,
  setPeriodIndex,
}) {
  const [orderType, setOrderType] = useState();
  const [orderDateIndex, setOrderDateIndex] = useState();

  useEffect(() => {
    setOrderType(orderTypeInitial);
    setOrderDateIndex(orderDateIndexInitial);
  }, [orderTypeInitial, orderDateIndexInitial]);

  const handleApply = () => {
    setActiveNavKey(orderType);
    setPeriodIndex(orderDateIndex);
    onHide();
  };

  return (
    <Modal
      fullscreen
      scrollable
      show={show}
      onHide={onHide}
      backdrop={false}
      aria-label="Order filters"
      className="d-sm-none">
      <Modal.Header
        style={{ backgroundColor: 'rgb(242, 242, 242)' }}
        className="ps-0 py-2">
        <Button
          size="lg"
          variant="link"
          onClick={onHide}
          className="text-reset text-decoration-none link-dark px-2 ps-3">
          <FaChevronLeft
            style={{ fontSize: '0.85rem' }}
            className="text-secondary mb-2 me-1"
          />
          <span className="fs-5 fw-semibold">Back</span>
        </Button>
        <Button
          size="lg"
          variant="warning"
          disabled={
            orderType === orderTypeInitial &&
            orderDateIndex === orderDateIndexInitial
          }
          style={{ padding: '0.6rem 1rem' }}
          className="fs-6"
          onClick={handleApply}>
          Apply
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div>
          <p
            style={{ fontSize: '0.9rem' }}
            className="bg-light text-uppercase text-dark fw-bold px-3 py-2 mb-0">
            Filter by order type
          </p>
          <ListGroup variant="flush" className="border-top border-bottom">
            <ListGroup.Item className="py-3">
              <FormCheck id="order-type-orders">
                <FormCheck.Input
                  type="radio"
                  name="order-type"
                  className="fs-1"
                  style={{ margin: '0.125rem 1rem 0 -1.275rem' }}
                  checked={orderType === 'orders'}
                  onChange={e => e.target.checked && setOrderType('orders')}
                />
                <FormCheck.Label className="fs-5">All orders</FormCheck.Label>
              </FormCheck>
            </ListGroup.Item>
            <ListGroup.Item className="py-3">
              <FormCheck id="order-type-not-shipped-yet">
                <FormCheck.Input
                  type="radio"
                  name="order-type"
                  className="fs-1"
                  style={{ margin: '0.125rem 1rem 0 -1.275rem' }}
                  checked={orderType === 'not-shipped-yet'}
                  onChange={e =>
                    e.target.checked && setOrderType('not-shipped-yet')
                  }
                />
                <FormCheck.Label className="fs-5">
                  Not shipped yet
                </FormCheck.Label>
              </FormCheck>
            </ListGroup.Item>
            <ListGroup.Item className="py-3">
              <FormCheck id="order-type-canceled-orders">
                <FormCheck.Input
                  type="radio"
                  name="order-type"
                  className="fs-1"
                  style={{ margin: '0.125rem 1rem 0 -1.275rem' }}
                  checked={orderType === 'canceled-orders'}
                  onChange={e =>
                    e.target.checked && setOrderType('canceled-orders')
                  }
                />
                <FormCheck.Label className="fs-5">
                  Canceled orders
                </FormCheck.Label>
              </FormCheck>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div>
          <p
            style={{ fontSize: '0.9rem' }}
            className="bg-light text-uppercase text-dark fw-bold px-3 py-2 mb-0">
            Filter by order date
          </p>
          <ListGroup variant="flush" className="border-top border-bottom">
            {PERIODS.slice(0, PERIODS.length - 1).map((p, idx) => (
              <ListGroup.Item key={idx} className="py-3">
                <FormCheck id={`order-date-idx-${idx}`}>
                  <FormCheck.Input
                    type="radio"
                    name="order-date"
                    className="fs-1"
                    style={{ margin: '0.125rem 1rem 0 -1.275rem' }}
                    checked={orderDateIndex === idx}
                    onChange={e => e.target.checked && setOrderDateIndex(idx)}
                  />
                  <FormCheck.Label className="fs-5">{p.label}</FormCheck.Label>
                </FormCheck>
              </ListGroup.Item>
            ))}

            {haveArchive && (
              <ListGroup.Item className="py-3">
                <FormCheck id={`order-date-idx-${PERIODS.length - 1}`}>
                  <FormCheck.Input
                    type="radio"
                    name="order-date"
                    className="fs-1"
                    style={{ margin: '0.125rem 1rem 0 -1.275rem' }}
                    checked={orderDateIndex === PERIODS.length - 1}
                    onChange={e =>
                      e.target.checked && setOrderDateIndex(PERIODS.length - 1)
                    }
                  />
                  <FormCheck.Label className="fs-5">
                    Archived orders
                  </FormCheck.Label>
                </FormCheck>
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
        <div className="d-flex flex-column align-items-center p-4 pe-3">
          <Button
            size="lg"
            variant="warning"
            disabled={
              orderType === orderTypeInitial &&
              orderDateIndex === orderDateIndexInitial
            }
            style={{ padding: '0.75rem 1rem' }}
            className="w-100"
            onClick={handleApply}>
            Apply
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default OrderFilterModal;
