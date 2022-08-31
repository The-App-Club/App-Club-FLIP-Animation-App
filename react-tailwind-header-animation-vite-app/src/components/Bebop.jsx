import {css, cx} from '@emotion/css';
import {memo} from 'react';
import {Flipped} from 'react-flip-toolkit';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';

const Bebop = () => {
  return (
    <header
      className={cx(
        css`
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 3rem;
          display: flex;
          align-items: center;
        `,
        `bg-white`,
        `gap-1`
      )}
    >
      <Flipped flipId="header-logo">
        <Link to={'/'} className={`flex items-center`}>
          <img src={logo} alt={'logo'} className={`w-10 h-10`} />
        </Link>
      </Flipped>
      <Flipped flipId="header-title">
        <Link to={'/'} className={`flex items-center`}>
          <Flipped inverseFlipId="header-title" scale>
            <h2 className={cx('text-xl')}>Make YourSelf</h2>
          </Flipped>
        </Link>
      </Flipped>
    </header>
  );
};

export {Bebop};
