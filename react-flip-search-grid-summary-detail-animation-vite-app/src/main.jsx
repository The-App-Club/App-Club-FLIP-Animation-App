import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import {css, cx} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import {HomePage} from './pages/home';
import {ProductPage} from './pages/product';

const App = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/product'} element={<ProductPage />} />
    </Routes>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
