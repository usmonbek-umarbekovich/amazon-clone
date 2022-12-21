import { useRef, useState, useEffect, useCallback } from 'react';
import ProductList from '../../components/Products/ProductList';
import './style.css';

function Home() {
  const [bannerMargin, setBannerMargin] = useState('-8rem');
  const bannerRef = useRef();

  const handleBannerMargin = useCallback(() => {
    const currHeight = (window.innerWidth * 7) / 19;
    setBannerMargin(`-${currHeight / 2}px`);
  }, []);

  useEffect(() => {
    document.title = 'Amazon.com. Spend less. Smile more.';
  }, []);

  useEffect(() => {
    if (bannerRef.current) handleBannerMargin();
  }, [handleBannerMargin]);

  useEffect(() => {
    const controller = new AbortController();

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
        className="home-image w-100 h-100"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_jpg"
        alt="Banner"
      />
      <ProductList />
    </div>
  );
}
export default Home;
