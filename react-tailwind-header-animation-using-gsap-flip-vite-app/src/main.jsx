import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useEffect, useCallback, useState} from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {Flipper} from 'react-flip-toolkit';
import {AnimatePresence} from 'framer-motion';

import {HomePage} from './pages/home';
import {NotFoundPage} from './pages/not-found';

import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {ScrollToTop} from './components/ScrollToTop';
import {Cowboy} from './components/Cowboy';
import {Bebop} from './components/Bebop';
import {default as CowboyBebop} from './components/CowboyBebop';

import '@fontsource/inter';
import './styles/index.css';
import './styles/index.scss';
import {useRef} from 'react';

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const [fullScreen, setFullScreen] = useState(true);

  const notifier = useCallback((e) => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFullScreen(false);
    }, 2300);
  }, []);

  return (
    <div
      className={cx(
        css`
          width: 100%;
          position: relative;
        `,
        `scrollbar-none`
      )}
    >
      <ScrollToTop />
      <CowboyBebop fullScreen={fullScreen} notifier={notifier} />
      <AnimatePresence>
        {showContent && (
          <>
            <main>
              <article>
                <Routes location={location}>
                  <Route path={'/'} element={<HomePage />} />
                  <Route path={'/*'} element={<NotFoundPage />} />
                </Routes>
              </article>
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
