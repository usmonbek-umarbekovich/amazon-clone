import { useStateValue } from '../../contexts/StateProvider';
import Subtotal from '../../components/Subtotal';
import CheckoutProduct from '../../components/CheckoutProduct';
import './style.css';

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Banner"
        />
        <div>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {basket.map((product, index) => (
            <CheckoutProduct
              index={index}
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
export default Checkout;
