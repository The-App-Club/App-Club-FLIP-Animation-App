import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import {css, cx} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import {HomePage} from './pages/home';
import {ProductPage} from './pages/product';

import {default as chance} from 'chance';

import data from './data/dump';

console.log(
  JSON.stringify(
    data.map((item) => {
      return {
        ...item,
        price: chance().integer({min: 200, max: 1200}),
        qty: chance().integer({min: 0, max: 12}),
      };
    })
  )
);

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
