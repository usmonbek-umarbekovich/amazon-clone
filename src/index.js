import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './contexts/StateProvider';
import reducer, { initialState } from './services/reducer';
import App from './components/App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
