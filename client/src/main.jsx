import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MunicipalityProvider } from './context/MunicipalityContext';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MunicipalityProvider>
        <App />
      </MunicipalityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
