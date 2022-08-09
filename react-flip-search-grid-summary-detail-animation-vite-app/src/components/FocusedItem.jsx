import {useEffect, useState} from 'react';
import {Flipper, Flipped, spring} from 'react-flip-toolkit';
import {motion, useAnimationControls} from 'framer-motion';
import {css, cx} from '@emotion/css';
import {ScrollContainer} from './ScrollContainer';
import {useNavigate} from 'react-router-dom';

const motionConfig = {
  initial: {
    x: 0,
    y: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  hidden: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const FocusedItem = ({
  data,
  searchTerm,
  matchedItemList,
  setMatchedItemList,
  focused,
  setFocused,
}) => {
  const navigation = useNavigate();
  const controls = useAnimationControls();

  if (matchedItemList.length <= 0) {
    return null;
  }
  return (
    <div
      className={css`
        cursor: pointer;
        background: #f7f7f7;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      `}
      onClick={(e) => {
        setMatchedItemList([]);
        setFocused(false);
        controls.start('hidden');
      }}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 0.5rem;
        `}
      >
        <b>SearchTerm</b>
        <p>{searchTerm}</p>
      </div>
      <ScrollContainer
        focused={focused}
        className={css`
          min-height: 100vh;
        `}
      >
        {matchedItemList.map((matchedItem, index) => {
          return (
            <div
              key={index}
              className={css`
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 1rem;

                @media (max-width: 768px) {
                  min-height: 50vh;
                }
              `}
              onClick={(e) => {
                e.stopPropagation();
                navigation('/product', {
                  state: {
                    ...matchedItem,
                  },
                });
              }}
            >
              <Flipped flipId={`heading-${matchedItem.id}`}>
                <div>
                  <Flipped inverseFlipId={`heading-${matchedItem.id}`} scale>
                    <h2>{matchedItem.title}</h2>
                  </Flipped>
                </div>
              </Flipped>

              <Flipped
                flipId={`img-${matchedItem.id}`}
                // onStart={(e)=>{console.log(e)}}
                onComplete={(e) => {
                  controls.start('animate');
                }}
              >
                <div>
                  <Flipped inverseFlipId={`img-${matchedItem.id}`} scale>
                    <img
                      src={matchedItem.url}
                      alt={''}
                      className={cx(
                        css`
                          display: block;
                          width: 100%;
                          max-width: 320px;
                          object-fit: contain;
                        `,
                        ``
                      )}
                    />
                  </Flipped>
                </div>
              </Flipped>
              <motion.p
                initial={'initial'}
                animate={controls}
                variants={motionConfig}
                className={css`
                  max-width: 20rem;
                  width: 100%;
                `}
              >
                {matchedItem.description}
              </motion.p>
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export {FocusedItem};
