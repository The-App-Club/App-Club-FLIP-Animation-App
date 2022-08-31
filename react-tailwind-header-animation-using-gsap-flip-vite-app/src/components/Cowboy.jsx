import {css, cx} from '@emotion/css';
import {memo} from 'react';
import {Flipped} from 'react-flip-toolkit';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import {motion} from 'framer-motion';

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
  hide: {
    x: 0,
    y: 60,
    opacity: 0,
  },
};

const Cowboy = () => {
  return (
    <motion.header
      variants={motionConfig}
      initial={'initial'}
      animate={'animate'}
      exit={'hide'}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      onAnimationStart={(e) => {}}
      onAnimationComplete={(e) => {}}
      className={cx(
        css`
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `
      )}
    >
      <Flipped flipId="header-title">
        <Link to={'/'} className={`flex items-center gap-1`}>
          <Flipped inverseFlipId="header-title" scale>
            <h2 className={cx('text-4xl')}>Make YourSelf</h2>
          </Flipped>
        </Link>
      </Flipped>
      <Flipped flipId="header-logo">
        <img src={logo} alt={'logo'} className={`w-96 h-96`} />
      </Flipped>
    </motion.header>
  );
};

export {Cowboy};
