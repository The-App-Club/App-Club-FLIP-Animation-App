import {css, cx} from '@emotion/css';
import {memo} from 'react';
import GridItemSp from './GridItemSp';

const GridContainerSp = ({handleClick, data}) => {
  return (
    <div
      className={css`
        display: none;
        @media (max-width: 768px) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
      `}
    >
      {data.map((item, index) => {
        return (
          <GridItemSp
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

export default memo(GridContainerSp);
