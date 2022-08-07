import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import {css, cx} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';

import {Grid} from './components/Grid';

const App = () => {
  return <Grid />;
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
