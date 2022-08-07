import {css} from '@emotion/css';
import {useMemo} from 'react';
import {Flipped} from 'react-flip-toolkit';

const Card = ({item, type}) => {
  const flipId = useMemo(() => {
    return `item-${item.id}`;
  }, [item]);

  return (
    <Flipped
      flipId={flipId}
      key={flipId}
      stagger
      onStart={(e) => {
        console.log(`item flip start`);
      }}
      onComplete={(e) => {
        console.log(`item flip end`);
      }}
    >
      <li
        className={css`
          background-color: white;
          padding: 0.5rem;
        `}
      >
        <Flipped inverseFlipId={flipId}>
          <div>
            <Flipped flipId={`${flipId}-content`} translate opacity>
              <div>
                <h3>{item.semiTitle}</h3>
                <p>{item.description}</p>
              </div>
            </Flipped>
          </div>
        </Flipped>
      </li>
    </Flipped>
  );
};

export {Card};
