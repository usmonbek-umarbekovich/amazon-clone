import ProductList from '../components/ProductList';
import './style.css';

function Home() {
  return (
    <div id="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_jpg"
        alt="Banner"
      />
      <ProductList />
    </div>
  );
}
export default Home;