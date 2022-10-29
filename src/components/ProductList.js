import Product from "./Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProductList() {
  return (
    <section id="products" className="px-2 px-md-3">
      <Row className="g-2" style={{ height: "max-content" }}>
        {PRODUCTS.map(p => (
          <Col key={p.id} sm={6} md={4} lg={3}>
            <Product
              id={p.id}
              title={p.title}
              price={p.price}
              actualPrice={p.actualPrice}
              ratings={p.ratings}
              image={p.image}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}

const PRODUCTS = [
  {
    id: "49538094",
    title:
      "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
    price: 239,
    actualPrice: 299.99,
    ratings: [0, 2, 1, 13, 2, 40],
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
  },
  {
    id: "12321341",
    title:
      "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
    price: 11.99,
    actualPrice: 23.99,
    ratings: [0, 2, 1, 1, 2, 70],
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
  },
  {
    id: "4903850",
    title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor",
    price: 199.99,
    ratings: [0, 2, 12, 1, 21, 60],
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg",
  },
  {
    id: "23445930",
    title:
      "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
    price: 98.99,
    actualPrice: 120,
    ratings: [0, 2, 1, 1, 2, 40],
    image:
      "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
  },
  {
    id: "3254354345",
    title:
      "New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
    price: 598.99,
    ratings: [0, 5, 1, 1, 13, 52],
    image:
      "https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg",
  },
  {
    id: "90829332",
    title:
      "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
    price: 1094,
    actualPrice: 1200.99,
    ratings: [0, 2, 1, 1, 22, 40],
    image:
      "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",
  },
];

export default ProductList;
