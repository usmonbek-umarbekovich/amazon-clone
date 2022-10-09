import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config';
import { useStateValue } from '../../contexts/StateProvider';
import Header from '../../layouts/Header';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Checkout from '../../pages/Checkout';
import './style.css';

function App() {
  const [_, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: 'SET_USER',
          payload: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          payload: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
