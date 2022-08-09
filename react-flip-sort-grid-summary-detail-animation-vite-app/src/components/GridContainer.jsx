import {css, cx} from '@emotion/css';
import {memo, useCallback} from 'react';
import GridItem from './GridItem';

import {tidy, arrange, desc, asc} from '@tidyjs/tidy';

const GridContainer = ({handleClick, data, sortType, sortedItem}) => {
  const makeArrager = useCallback(() => {
    if (sortType === `asc`) {
      return arrange([asc(sortedItem)]);
    } else {
      return arrange([desc(sortedItem)]);
    }
  }, [sortType, sortedItem]);

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 1rem;
        @media (max-width: 1400px) {
          grid-template-columns: repeat(5, 1fr);
        }
        @media (max-width: 1000px) {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 800px) {
          grid-template-columns: repeat(2, 1fr);
        }
      `}
    >
      {tidy(data, makeArrager()).map((item, index) => {
        return (
          <GridItem
            key={`${index}`}
            index={index}
            item={item}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default memo(GridContainer);
