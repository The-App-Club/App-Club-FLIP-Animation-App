import {css, cx} from '@emotion/css';
import {useCallback, useEffect, useState} from 'react';
import {Flipper, Flipped} from 'react-flip-toolkit';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';

import GridItem from './GridItem';
import GridContainer from './GridContainer';

import data from '../data/dump';

const Grid = () => {
  const [sortType, setSortType] = useState('asc');
  const [sortedItem, setSortedItem] = useState('price');

  const navigation = useNavigate();

  const handleClick = useCallback((e, item) => {
    navigation('/product', {
      state: {
        ...item,
      },
    });
  }, []);

  const handleChangeSortItem = useCallback((e) => {
    setSortedItem(e.target.value);
  }, []);
  const handleChangeSortType = useCallback((e) => {
    setSortType(e.currentTarget.value);
  }, []);

  return (
    <Flipper
      flipKey={`${sortType + sortedItem}`}
      // https://github.com/aholachek/react-flip-toolkit#spring-customizations
      // "stiff", "noWobble", "gentle", "veryGentle", or "wobbly"
      spring={'veryGentle'}
      // https://github.com/aholachek/react-flip-toolkit#basic-props
      staggerConfig={{
        // the "default" config will apply to staggered elements without explicit keys
        default: {
          // default direction is forwards
          reverse: true,
          // default is .1, 0 < n < 1
          speed: 0.5,
        },
        // this will apply to Flipped elements with the prop stagger='namedStagger'
        itemHeaderStagger: {speed: 0.2},
        itemImageStagger: {speed: 0.3},
        itemPriceStagger: {speed: 0.1},
        itemQtyStagger: {speed: 0.1},
      }}
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
            display: flex;
            align-items: center;
            gap: 1rem;
            width: 100%;
            max-width: 20rem;
            margin: 0 auto;
            padding: 1rem;
          `}
        >
          <FormControl>
            <FormLabel id="sort-type">Sort</FormLabel>
            <RadioGroup
              aria-labelledby="sort-type"
              name="sort-type"
              value={sortType}
              onChange={handleChangeSortType}
            >
              <FormControlLabel value="asc" control={<Radio />} label="Asc" />
              <FormControlLabel value="desc" control={<Radio />} label="Desc" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="sort-item">Sort Item</InputLabel>
            <Select
              labelId="sort-item"
              id="sort-item"
              value={sortedItem}
              label="Sort Item"
              onChange={handleChangeSortItem}
            >
              <MenuItem value={'price'}>Price</MenuItem>
              <MenuItem value={'qty'}>Qty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Flipped>
      <GridContainer
        data={data}
        handleClick={handleClick}
        sortType={sortType}
        sortedItem={sortedItem}
      />
    </Flipper>
  );
};

export {Grid};
