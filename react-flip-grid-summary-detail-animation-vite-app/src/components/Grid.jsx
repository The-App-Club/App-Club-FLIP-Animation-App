import {css, cx} from '@emotion/css';
import {useEffect, useState} from 'react';
import {Flipper, Flipped, spring} from 'react-flip-toolkit';
import {motion, useAnimationControls} from 'framer-motion';
import {Scrollbars} from 'rc-scrollbars';
import data from '../data/dump';
import {Spacer} from './Spacer';

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

const Grid = () => {
  const controls = useAnimationControls();
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, index) => {
    setActiveIndex(index);
    setFocused(true);
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = html.querySelector('body');
    if (focused) {
      html.classList.add('loading');
      body.classList.add('loading');
    } else {
      html.classList.remove('loading');
      body.classList.remove('loading');
    }
  }, [focused]);

  return (
    <Flipper
      flipKey={focused}
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      `}
      onStart={(e) => {
        console.log(`main flip start`);
      }}
      onComplete={(e) => {
        console.log(`main flip end`);
      }}
    >
      <Scrollbars
        className={cx(
          css`
            width: 100%;
            max-width: 60rem;
            min-height: 32rem;
            .rc-scrollbars-track {
              z-index: ${focused ? -1 : 100} !important;
            }
            @media (max-width: 768px) {
              .rc-scrollbars-view {
                position: initial !important;
                inset: initial !important;
                overflow: initial !important;
                margin-right: initial !important;
                margin-bottom: initial !important;
              }
              .rc-scrollbars-track.rc-scrollbars-track-h {
                display: none !important;
              }
              .rc-scrollbars-track.rc-scrollbars-track-v {
                display: none !important;
              }
            }
          `,
          ``
        )}
      >
        <div
          className={css`
            position: relative;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            @media (max-width: 768px) {
              max-height: initial;
              overflow: initial;
              overflow-y: initial;
              grid-template-columns: repeat(2, 1fr);
            }
            gap: 1rem;
            padding: 1rem;
            border: 1px solid darkgray;
          `}
        >
          {data.map((item, index) => {
            if (activeIndex !== index) {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    handleClick(e, index);
                  }}
                  className={cx(css`
                    border: 1px solid darkgray;
                    padding: 0.5rem;
                    :hover {
                      cursor: pointer;
                    }
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
                    flipId={`heading-${index}`}
                    // onStart={(e)=>{console.log(e)}}
                    // onComplete={(e)=>{console.log(e)}}
                    translate
                  >
                    <h2>{item.title}</h2>
                  </Flipped>
                  <Flipped
                    flipId={`img-${index}`}
                    // onStart={(e)=>{console.log(e)}}
                    // onComplete={(e)=>{console.log(e)}}
                    translate
                  >
                    <img src={item.url} alt={''} width={120} />
                  </Flipped>
                </div>
              );
            } else {
              return null;
            }
          })}
          {activeIndex >= 0 && (
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
          )}
        </div>
      </Scrollbars>
    </Flipper>
  );
};

export {Grid};
