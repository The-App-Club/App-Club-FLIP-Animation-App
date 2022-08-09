import {css, cx} from '@emotion/css';
import {memo} from 'react';
import {FocusedItem} from './FocusedItem';
import GridItem from './GridItem';

const GridContainer = ({
  handleClick,
  data,
  searchTerm,
  focused,
  matchedItemList,
  setMatchedItemList,
  setFocused,
}) => {
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
        @media (max-width: 768px) {
          display: none;
        }
      `}
    >
      {data.map((item, index) => {
        return (
          <GridItem
            key={`${index}`}
            index={index}
            item={item}
            handleClick={handleClick}
          />
        );
      })}
      <FocusedItem
        data={data}
        searchTerm={searchTerm}
        focused={focused}
        matchedItemList={matchedItemList}
        setMatchedItemList={setMatchedItemList}
        setFocused={setFocused}
        className={css`
          display: block;
          @media (max-width: 768px) {
            display: none;
          }
        `}
      />
    </div>
  );
};

export default memo(GridContainer);
