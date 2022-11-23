import { useRef, useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import './style.css';

function Home() {
  const [bannerMargin, setBannerMargin] = useState('-8rem');
  const bannerRef = useRef();

  const handleBannerMargin = useCallback(() => {
    setBannerMargin(
      `-${bannerRef.current.getBoundingClientRect().height / 2}px`
    );
  }, []);

  useEffect(() => {
    document.title = 'Amazon.com. Spend less. Smile more.';
  }, []);

  useEffect(() => {
    if (bannerRef.current == null) return;
    handleBannerMargin();
  }, [handleBannerMargin]);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener('load', handleBannerMargin, {
      once: true,
      signal: controller.signal,
    });

    window.addEventListener('resize', handleBannerMargin, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [handleBannerMargin]);

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
