import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { productAdded } from '../../features/basket/basketSlice';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { FaStar, FaStarHalfAlt, FaMinus, FaPlus } from 'react-icons/fa';
import './style.css';

function Product({
  id,
  inStock,
  price,
  actualPrice,
  ratings,
  title,
  image,
  highlights,
}) {
  const dispatch = useDispatch();

  const [imageHeight, setImageHeight] = useState('100%');
  const [quantity, setQuantity] = useState(0);

  const productInfoRef = useRef();

  useEffect(() => {
    if (!productInfoRef.current) return;
    setImageHeight(
      `${productInfoRef.current.getBoundingClientRect().height}px`
    );

    const controller = new AbortController();
    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth >= 576) return;
        setImageHeight(
          `${productInfoRef.current.getBoundingClientRect().height}px`
        );
      },
      { signal: controller.signal }
    );
    return () => controller.abort();
  }, []);

  const addToBasket = () => {
    dispatch(
      productAdded({
        id,
        inStock,
        price,
        quantity,
        title,
        image,
        highlights,
        selected: true,
        isGift: false,
      })
    );
    setQuantity(0);
  };

  const [ratingDecimal, ratingFraction] = useMemo(() => {
    let total = 0;
    let weightedSum = 0;
    ratings.forEach((r, i) => {
      weightedSum += r * i;
      total += r;
    });

    const average = weightedSum / total;
    return [
      Math.trunc(average),
      Number.parseFloat(Number(average - Math.trunc(average)).toFixed(1)),
    ];
  }, [ratings]);

  return (
    <Card className="rounded-1 w-100 h-100">
      <Stack
        direction="horizontal"
        className="h-100 bg-white flex-sm-column align-items-center">
        <div
          style={{ height: '13rem' }}
          className="d-none d-sm-block w-100 px-2">
          <Card.Img
            variant="top"
            className="w-100 h-100"
            style={{ objectFit: 'contain' }}
            src={image}
            alt={title}
          />
        </div>
        <div style={{ height: imageHeight }} className="d-sm-none col-4 px-2">
          <Card.Img
            variant="top"
            className="w-100 h-100"
            style={{ objectFit: 'contain' }}
            src={image}
            alt={title}
          />
        </div>
        <Card.Body ref={productInfoRef} className="d-flex flex-column p-2">
          <Card.Title className="fw-normal mb-1 fs-6 truncate-lines lines-2">
            {title}
          </Card.Title>

          <Stack>
            <Stack direction="horizontal" className="mb-3">
              <Stack direction="horizontal" className="me-2">
                {Array(ratingDecimal)
                  .fill()
                  .map((_, i) => (
                    <FaStar className="fs-5 text-warning" key={i} />
                  ))}
                {0.2 < ratingFraction && ratingFraction < 0.8 && (
                  <FaStarHalfAlt className="fs-5 text-warning" />
                )}
                {ratingFraction > 0.7 && (
                  <FaStar className="fs-5 text-warning" />
                )}
              </Stack>
              <Link className="text-decoration-none">
                {ratings.reduce((prev, curr) => prev + curr)}
              </Link>
            </Stack>

            <Stack direction="horizontal" className="align-items-end">
              <p className="d-flex align-items-start me-1">
                <small style={{ lineHeight: 0.7 }}>$</small>
                <strong
                  className="fs-3 fw-semibold"
                  style={{ lineHeight: 0.6 }}>
                  {Math.trunc(price)}
                </strong>
                <small style={{ lineHeight: 0.7 }}>
                  {Number(price).toFixed(2).split('.')[1]}
                </small>
              </p>
              {actualPrice && (
                <p
                  className="text-decoration-line-through text-secondary"
                  style={{ lineHeight: 0.3 }}>
                  ${Number(actualPrice).toFixed(2)}
                </p>
              )}
            </Stack>

            <Stack className="mb-2">
              {Object.entries(highlights).map(([key, value]) => (
                <div key={key} className="d-flex">
                  <p className="fw-bold me-1 mb-0 text-capitalize">{key}:</p>
                  <p className="m-0">{value}</p>
                </div>
              ))}
            </Stack>
          </Stack>
          <Stack
            direction="horizontal"
            className="align-items-center justify-content-between flex-wrap">
            <ButtonGroup aria-label="Product Quantity" className="me-2 mb-2">
              <Button
                variant="warning"
                aria-disabled={quantity === 0}
                disabled={quantity === 0}
                className="rounded-0"
                onClick={() => setQuantity(prev => prev - 1)}>
                <FaMinus />
              </Button>
              <Button variant="light" className="fs-5 fw-bold py-0 px-3">
                {quantity}
              </Button>
              <Button
                variant="warning"
                className="rounded-0"
                onClick={() => setQuantity(prev => prev + 1)}>
                <FaPlus />
              </Button>
            </ButtonGroup>
            <Button
              variant="warning"
              aria-disabled={quantity === 0}
              disabled={quantity === 0}
              className="rounded-0 mb-2"
              onClick={addToBasket}>
              Add to Basket
            </Button>
          </Stack>
        </Card.Body>
      </Stack>
    </Card>
  );
}
export default Product;
