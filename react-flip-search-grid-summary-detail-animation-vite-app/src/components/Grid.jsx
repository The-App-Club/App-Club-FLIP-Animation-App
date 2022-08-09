import {css, cx} from '@emotion/css';
import {useCallback, useEffect, useState} from 'react';
import {Flipper, Flipped, spring} from 'react-flip-toolkit';
import {Scrollbars} from 'rc-scrollbars';
import data from '../data/dump';
import {Spacer} from './Spacer';
import {FocusedItem} from './FocusedItem';
import {ScrollContainer} from './ScrollContainer';
import GridItem from './GridItem';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Grid = () => {
  const [focused, setFocused] = useState(false);
  const [matchedItemList, setMatchedItemList] = useState([]);

  const handleClick = useCallback((e, id) => {
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
      flipKey={matchedItemList
        .map((matchedItem) => {
          return matchedItem.id;
        })
        .join('')}
      className={css`
        width: 100%;
        padding: 1rem 0.5rem;
      `}
      onStart={(e) => {
        console.log(`main flip start`);
      }}
      onComplete={(e) => {
        console.log(`main flip end`);
      }}
    >
      <Flipped flipId={`search-form-id`}>
        <Box
          component="form"
          autoComplete="off"
          className={css`
            width: 100%;
            padding-bottom: 1rem;
          `}
        >
          <TextField
            fullWidth
            label="Bebop Search"
            type="search"
            onChange={(e) => {
              const searchTerm = e.currentTarget.value;
              const searchResults = data.filter((item) => {
                return searchTerm && item.title.match(searchTerm);
              });
              if (searchTerm) {
                setFocused(true);
              } else {
                setFocused(false);
              }
              setMatchedItemList(searchResults);
            }}
          />
        </Box>
      </Flipped>
      <ScrollContainer focused={focused}>
        {data.map((item, index) => {
          return (
            <GridItem
              key={index}
              index={index}
              item={item}
              handleClick={handleClick}
            />
          );
        })}
        <FocusedItem
          data={data}
          focused={focused}
          matchedItemList={matchedItemList}
          setMatchedItemList={setMatchedItemList}
          setFocused={setFocused}
        />
      </ScrollContainer>
    </Flipper>
  );
};

export {Grid};
