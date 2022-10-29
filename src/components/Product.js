import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function Product({ id, title, image, price, ratings, actualPrice }) {
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
    return [
      Math.trunc(average),
      Number.parseFloat(Number(average - Math.trunc(average)).toFixed(1)),
    ];
  }, [ratings]);

  return (
    <Card className="rounded-1 w-100 h-100 flex-row flex-sm-column align-items-center">
      <div style={{ maxHeight: "13rem" }} className="h-100 px-2 col-4 col-sm-auto">
        <Card.Img
          variant="top"
          className="w-100 h-100 bg-transparent"
          style={{ objectFit: 'contain' }}
          src={image}
          alt={title}
        />
      </div>
      <Card.Body className="p-2">
        <Card.Title className="fw-normal mb-1 fs-6">
          {title.length > 75 ? title.slice(0, 75) + "..." : title}
        </Card.Title>
        <Stack>
          <Stack direction="horizontal" className='mb-3'>
            <Stack direction="horizontal" className="me-2">
              {Array(ratingDecimal)
                .fill()
                .map((_, i) => (
                  <FaStar className="fs-5 text-warning" key={i} />
                ))}
              {0.2 < ratingFraction && ratingFraction < 0.8 && (
                <FaStarHalfAlt className="fs-5 text-warning" />
              )}
              {ratingFraction > 0.7 && <FaStar className="fs-5 text-warning" />}
            </Stack>
            <Link className="text-decoration-none">
              {ratings.reduce((prev, curr) => prev + curr)}
            </Link>
          </Stack>
          <Stack direction='horizontal' className='align-items-end mb-2'>
            <p className='d-flex align-items-start me-1'>
              <small style={{ lineHeight: 0.7 }}>$</small>
              <strong className='fs-3 fw-semibold' style={{ lineHeight: 0.6 }}>{Math.trunc(price)}</strong>
              <small style={{ lineHeight: 0.7 }}>{Number(price).toFixed(2).split('.')[1]}</small>
            </p>
            {actualPrice && (
              <p
                className='text-decoration-line-through text-secondary'
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
    </Card>
  );
}
export default Product;