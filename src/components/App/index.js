import { Route, Routes } from 'react-router-dom';
import Header from '../../layouts/Header';
import Home from '../../pages/Home';
import Checkout from '../../pages/Checkout';
import './style.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
