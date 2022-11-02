import { useRef, useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import './style.css';

function Home() {
  const [bannerMargin, setBannerMargin] = useState('-8rem');
  const bannerRef = useRef();

  useEffect(() => {
    if (!bannerRef.current) return;
    bannerRef.current.addEventListener(
      'load',
      () => {
        setBannerMargin(
          `-${bannerRef.current.getBoundingClientRect().height / 2}px`
        );
      },
      { once: true }
    );

    const controller = new AbortController();
    window.addEventListener(
      'resize',
      () =>
        setBannerMargin(
          `-${bannerRef.current.getBoundingClientRect().height / 2}px`
        ),
      { signal: controller.signal }
    );

    return () => controller.abort();
  }, []);

  return (
    <div id="home">
      <img
        ref={bannerRef}
        style={{ marginBottom: bannerMargin }}
        className="home__image w-100"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_jpg"
        alt="Banner"
      />
      <ProductList />
    </div>
  );
}
export default Home;
