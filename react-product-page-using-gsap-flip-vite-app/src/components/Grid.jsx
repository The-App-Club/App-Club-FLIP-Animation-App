import {css, cx} from '@emotion/css';
import {createRef, memo, useMemo, useState} from 'react';

const Grid = ({data, cardCount, itemsDomRef, handleFlip}) => {
  return (
    <div
      className={css`
        width: 100%;
        min-height: 30rem;
        @media (max-width: 768px) {
          min-height: 20rem;
        }
        padding: 1rem;
        /* border: 1px solid; */
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(6, 1fr);
        gap: 1rem;
        > div {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 4rem;
          /* border: 1px solid; */
          min-height: 8rem;
          grid-column: span 3; // 2個に按分
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          &:hover {
            cursor: pointer;
          }
          &.is-active {
            grid-row: 1;
            grid-column: 1 / span 6; // 1個に按分
          }
          &.is-inactive {
            grid-column: span 2; // 3個に按分
          }
        }
      `}
    >
      {[...Array(cardCount).keys()].map((n, index) => {
        return (
          <div
            key={index}
            className={cx(
              css`
                background-image: url(${data[index].imageURL});
              `,
              ''
            )}
            ref={itemsDomRef[index]}
            onClick={(e) => {
              handleFlip(e, index);
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default memo(Grid);
