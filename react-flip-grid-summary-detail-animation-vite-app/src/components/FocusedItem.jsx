import {useEffect, useState} from 'react';
import {Flipper, Flipped, spring} from 'react-flip-toolkit';
import {motion, useAnimationControls} from 'framer-motion';
import {css, cx} from '@emotion/css';

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

const FocusedItem = ({data, activeIndex, setFocused, setActiveIndex}) => {
  const controls = useAnimationControls();

  if (activeIndex < 0) {
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
        setActiveIndex(-1);
        setFocused(false);
        controls.start('hidden');
      }}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        `}
      >
        <div
          className={css`
            max-width: 60rem;
            width: 100%;
            margin: auto;
            padding: 1rem;
            min-height: 40rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1rem;

            @media (max-width: 768px) {
              min-height: 50vh;
            }
          `}
        >
          <Flipped flipId={`heading-${activeIndex}`}>
            <div>
              <Flipped inverseFlipId={`heading-${activeIndex}`} scale>
                <h2>{data[activeIndex].title}</h2>
              </Flipped>
            </div>
          </Flipped>

          <div
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1rem;
            `}
          >
            <Flipped
              flipId={`img-${activeIndex}`}
              // onStart={(e)=>{console.log(e)}}
              onComplete={(e) => {
                controls.start('animate');
              }}
            >
              <div>
                <Flipped inverseFlipId={`img-${activeIndex}`} scale>
                  <img
                    src={data[activeIndex].url}
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
              {data[activeIndex].description}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export {FocusedItem};
