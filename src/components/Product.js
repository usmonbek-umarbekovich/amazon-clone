import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function Product({ id, title, image, price, ratings }) {
  const dispatch = useStateValue()[1];
  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      payload: {
        id,
        title,
        image,
        price,
        ratings,
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
    console.log([
      Math.trunc(average),
      Number.parseFloat(Number(average - Math.trunc(average)).toFixed(1)),
    ]);
    return [
      Math.trunc(average),
      Number.parseFloat(Number(average - Math.trunc(average)).toFixed(1)),
    ];
  }, [ratings]);

  return (
    <Card className="rounded-1 w-100 m-1">
      <div style={{ maxHeight: '15rem' }} className="w-100 p-2">
        <Card.Img
          variant="top"
          className="w-100 h-100 bg-transparent"
          style={{ objectFit: 'contain' }}
          src={image}
          alt={title}
        />
      </div>
      <Card.Body>
        <Card.Title className="fw-normal mb-1">{title}</Card.Title>
        <Stack>
          <Stack direction="horizontal">
            <Stack direction="horizontal" className="me-2">
              {Array(ratingDecimal)
                .fill()
                .map((_, i) => (
                  <FaStar className="fs-5 text-warning" key={i} />
                ))}
              {0.2 < ratingFraction < 0.8 && (
                <FaStarHalfAlt className="fs-5 text-warning" />
              )}
              {ratingFraction > 0.7 && <FaStar className="fs-5 text-warning" />}
            </Stack>
            <Link className="text-decoration-none fs-5">
              {ratings.reduce((prev, curr) => prev + curr)}
            </Link>
          </Stack>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
        </Stack>
        <Button variant="warning" className="rounded-0" onClick={addToBasket}>
          Add to Basket
        </Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
