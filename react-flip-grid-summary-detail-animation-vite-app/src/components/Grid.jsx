import {css, cx} from '@emotion/css';
import {useCallback, useEffect, useState} from 'react';
import {Flipper, Flipped, spring} from 'react-flip-toolkit';
import {Scrollbars} from 'rc-scrollbars';
import data from '../data/dump';
import {Spacer} from './Spacer';
import {FocusedItem} from './FocusedItem';
import {ScrollContainer} from './ScrollContainer';
import Item from './Item';

const Grid = () => {
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = useCallback((e, index) => {
    setActiveIndex(index);
    setFocused(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = html.querySelector('body');
    if (focused) {
      html.classList.add('loading');
      body.classList.add('loading');
    } else {
      html.classList.remove('loading');
      body.classList.remove('loading');
    }
  }, [focused]);

  return (
    <Flipper
      flipKey={focused}
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      `}
      onStart={(e) => {
        console.log(`main flip start`);
      }}
      onComplete={(e) => {
        console.log(`main flip end`);
      }}
    >
      <ScrollContainer focused={focused}>
        {data.map((item, index) => {
          if (activeIndex !== index) {
            return (
              <Item
                key={index}
                index={index}
                item={item}
                handleClick={handleClick}
              />
            );
          } else {
            return null;
          }
        })}
        <FocusedItem
          data={data}
          activeIndex={activeIndex}
          setFocused={setFocused}
          setActiveIndex={setActiveIndex}
        />
      </ScrollContainer>
    </Flipper>
  );
};

export {Grid};
