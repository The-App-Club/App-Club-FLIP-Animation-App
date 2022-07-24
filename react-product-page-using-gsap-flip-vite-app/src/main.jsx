import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {createRef, useCallback, useMemo, useState} from 'react';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import '@fontsource/inter';
import './styles/index.scss';
import {Description} from './components/Description';
import Grid from './components/Grid';

gsap.registerPlugin(Flip);

const App = () => {
  const cardCount = 4;

  const [tik, setTik] = useState(false);

  const data = useMemo(() => {
    return [
      {
        text: `1`,
        imageURL: `https://picsum.photos/seed/${1111}/1200/800`,
      },
      {
        text: `2`,
        imageURL: `https://picsum.photos/seed/${2111}/1200/800`,
      },
      {
        text: `3`,
        imageURL: `https://picsum.photos/seed/${3111}/1200/800`,
      },
      {
        text: `4`,
        imageURL: `https://picsum.photos/seed/${4111}/1200/800`,
      },
    ];
  }, []);

  const itemsDomRef = useMemo(() => {
    return [...Array(cardCount).keys()].map((n) => {
      return createRef();
    });
  }, [cardCount]);

  const handleFlip = useCallback((e, index) => {
    const dom = e.target;
    const itemDomList = itemsDomRef.map((itemDomRef) => {
      return itemDomRef.current;
    });
    const state = Flip.getState(itemDomList);
    const isActiveDom = dom.classList.contains(`is-active`);
    itemDomList.forEach((otherDom, otherIdx) => {
      otherDom.classList.remove(`is-active`);
      otherDom.classList.remove(`is-inactive`);
      if (!isActiveDom && index !== otherIdx) {
        otherDom.classList.add(`is-inactive`);
      }
    });

    if (!isActiveDom) {
      dom.classList.add(`is-active`);
    }

    Flip.from(state, {
      duration: 1,
      ease: 'expo.out',
      absolute: true,
      onStart: (e) => {
        // console.log(`onStart`);
        setTik(false);
      },
      onComplete: (e) => {
        // console.log(`onComplete`);
        const isAnyActive = itemDomList.some((itemDom) => {
          return itemDom.classList.contains(`is-active`);
        });
        isAnyActive && setTik(true);
      },
    });
  }, []);

  return (
    <div
      className={css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
      `}
    >
      <header>
        <h2>This is sample</h2>
      </header>
      <div
        className={css`
          max-width: 60rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          @media (max-width: 768px) {
            flex-direction: column;
          }
        `}
      >
        {/* <Description tik={tik} /> */}
        <Grid
          data={data}
          cardCount={cardCount}
          handleFlip={handleFlip}
          itemsDomRef={itemsDomRef}
        />
        <Description tik={tik} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
