import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import {Flipper, Flipped} from 'react-flip-toolkit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {css, cx} from '@emotion/css';
import {Card} from './components/Card';
import data from './data/dump';

import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  const [type, setType] = useState('list');
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <div
      className={css`
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    >
      <div
        className={css`
          max-width: 60rem;
          width: 100%;
          margin: auto;
        `}
      >
        <Flipper
          flipKey={`${type}`}
          spring={'noWobble'}
          staggerConfig={{
            default: {
              reverse: true,
              speed: 1,
            },
          }}
          decisionData={type}
          onStart={(e) => {
            console.log(`main start`);
            // const html = document.documentElement;
            // const body = html.querySelector('body');
            // html.classList.add('loading');
            // body.classList.add('loading');
          }}
          onComplete={(e) => {
            console.log(`main end`);
            // const html = document.documentElement;
            // const body = html.querySelector('body');
            // html.classList.remove('loading');
            // body.classList.remove('loading');
          }}
        >
          <FormControl
            fullWidth
            className={css`
              display: flex;
              align-items: center;
              gap: 1rem;
              flex-direction: row !important;
              padding: 0 1rem !important;
            `}
          >
            <FormLabel id="display-type">Type</FormLabel>
            <RadioGroup
              className={css`
                display: flex;
                flex-direction: row !important;
              `}
              aria-labelledby="display-type"
              name="display-type-group"
              value={type}
              onChange={handleChange}
            >
              <FormControlLabel value="list" control={<Radio />} label="list" />
              <FormControlLabel value="grid" control={<Radio />} label="grid" />
            </RadioGroup>
          </FormControl>
          <Flipped flipId={type}>
            <div
              // https://stackoverflow.com/questions/53772429/mui-how-can-i-style-the-scrollbar-with-css-in-js
              className={cx(
                css`
                  overflow: hidden;
                  overflow-y: auto;
                  max-height: 30rem;
                  @media (max-width: 768px) {
                    max-height: initial;
                  }
                  padding: 1rem;
                  background-color: #ececec;
                  ul {
                    list-style-type: none;
                  }
                  &.grid > ul {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    @media (max-width: 768px) {
                      grid-template-columns: repeat(2, 1fr);
                    }
                    gap: 1rem;
                  }
                  &.list > ul {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    flex-direction: column;
                    gap: 1rem;
                    li {
                      width: 100%;
                    }
                  }
                `,
                `${type === 'grid' ? 'grid' : 'list'}`
              )}
            >
              <Flipped inverseFlipId={type}>
                <ul>
                  {[...data].map((item, index) => {
                    return <Card item={item} type={type} key={index} />;
                  })}
                </ul>
              </Flipped>
            </div>
          </Flipped>
        </Flipper>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
