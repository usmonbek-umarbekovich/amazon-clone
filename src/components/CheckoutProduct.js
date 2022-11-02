import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useStateValue } from '../contexts/StateProvider';

function CheckoutProduct({
  id,
  index,
  image,
  title,
  price,
  selected,
  hideButton,
}) {
  const dispatch = useStateValue()[1];

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      payload: { id, index },
    });
  };

  const updateProduct = changes => {
    dispatch({
      type: 'UPDATE_BASKET_PRODUCT',
      payload: { id, changes },
    });
  };

  return (
    <Stack direction="horizontal" className="align-items-center">
      <Form.Check
        aria-label={title}
        className="fs-5 me-2"
        checked={selected}
        onChange={e => {
          updateProduct({ selected: e.target.checked });
        }}
      />

      <div style={{ width: '21%', flex: '0 0 auto' }} className="px-2">
        <img
          className="w-100 h-100"
          style={{ objectFit: 'contain' }}
          src={image}
          alt={title}
        />
      </div>

      <div className="ps-2 flex-grow-1">
        <Stack
          direction="horizontal"
          className="align-items-start justify-content-between">
          <p className="fs-5 fw-normal lh-sm mb-2">
            {title.length > 85 ? title.slice(0, 85) + '...' : title}
          </p>
          <p className="fs-5 fw-semibold text-nowrap text-end col-3">
            ${Number(price).toFixed(2)}
          </p>
        </Stack>
        {!hideButton && (
          <Button variant="link" className="p-0" onClick={removeFromBasket}>
            Delete
          </Button>
        )}
      </div>
    </Stack>
  );
}
export default CheckoutProduct;
