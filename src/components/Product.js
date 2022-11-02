import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function Product({ id, title, image, price, ratings, actualPrice }) {
  const [imageHeight, setImageHeight] = useState('100%');
  const productInfoRef = useRef();
  const dispatch = useStateValue()[1];

  useEffect(() => {
    if (!productInfoRef.current) return;
    setImageHeight(
      `${productInfoRef.current.getBoundingClientRect().height}px`
    );

    const controller = new AbortController();
    window.addEventListener(
      'resize',
      e => {
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
    dispatch({
      type: 'ADD_TO_BASKET',
      payload: {
        id,
        title,
        image,
        price,
        selected: true,
      },
    });
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
        <Card.Body ref={productInfoRef} className="p-2">
          <Card.Title className="fw-normal mb-1 fs-6">
            {title.length > 75 ? title.slice(0, 75) + '...' : title}
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
            <Stack direction="horizontal" className="align-items-end mb-2">
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
          </Stack>
          <Button variant="warning" className="rounded-0" onClick={addToBasket}>
            Add to Basket
          </Button>
        </Card.Body>
      </Stack>
    </Card>
  );
}
export default Product;
