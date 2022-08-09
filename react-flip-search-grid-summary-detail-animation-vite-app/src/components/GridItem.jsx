import {css, cx} from '@emotion/css';
import {memo} from 'react';
import {Flipped} from 'react-flip-toolkit';
const GridItem = ({item, index, handleClick}) => {
  return (
    <div
      onClick={(e) => {
        handleClick(e, item.id);
      }}
      className={cx(css`
        border: 1px solid darkgray;
        padding: 0.5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h2 {
          font-size: 1.2rem;
        }
      `)}
    >
      <Flipped
        flipId={`heading-${item.id}`}
        // onStart={(e)=>{console.log(e)}}
        // onComplete={(e)=>{console.log(e)}}
        translate
      >
        <h2>{item.title}</h2>
      </Flipped>
      <Flipped
        flipId={`img-${item.id}`}
        // onStart={(e)=>{console.log(e)}}
        // onComplete={(e)=>{console.log(e)}}
        translate
      >
        <img src={item.url} alt={''} width={120} />
      </Flipped>
    </div>
  );
};

export default memo(GridItem);
