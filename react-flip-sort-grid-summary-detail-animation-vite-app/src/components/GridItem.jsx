import {css, cx} from '@emotion/css';
import {memo} from 'react';
import {Flipped} from 'react-flip-toolkit';
const GridItem = ({item, index, handleClick, className = css``}) => {
  return (
    <div
      onClick={(e) => {
        handleClick(e, item);
      }}
      className={cx(
        css`
          border: 1px solid darkgray;
          padding: 0.5rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          :hover {
            cursor: pointer;
          }
          h2 {
            font-size: 1.2rem;
          }
        `,
        className
      )}
    >
      <Flipped
        flipId={`heading-${item.id}`}
        // onStart={(e)=>{console.log(e)}}
        // onComplete={(e)=>{console.log(e)}}
        translate
        stagger={'itemHeaderStagger'}
      >
        <h2>{item.title}</h2>
      </Flipped>
      <Flipped
        flipId={`img-${item.id}`}
        // onStart={(e)=>{console.log(e)}}
        // onComplete={(e)=>{console.log(e)}}
        translate
        stagger={'itemImageStagger'}
      >
        <img src={item.url} alt={''} width={120} />
      </Flipped>
      <Flipped
        flipId={`price-${item.id}`}
        // onStart={(e)=>{console.log(e)}}
        // onComplete={(e)=>{console.log(e)}}
        translate
        stagger={'itemPriceStagger'}
      >
        <b>${item.price}</b>
      </Flipped>
      <Flipped
        flipId={`qty-${item.id}`}
        // onStart={(e)=>{console.log(e)}}
        // onComplete={(e)=>{console.log(e)}}
        translate
        stagger={'itemQtyStagger'}
      >
        <b>{item.qty} items</b>
      </Flipped>
    </div>
  );
};

export default memo(GridItem);
