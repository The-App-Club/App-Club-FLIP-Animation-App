import {css, cx} from '@emotion/css';
import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';

const Header = ({className = css``, handleClick}) => {
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
          &.initial {
            align-items: center;
          }
          &.overlay {
            min-height: 100vh;
            justify-content: center;
          }
        `,
        `bg-blue-200`,
        className
      )}
      onClick={handleClick}
    >
      {/* <Link to={'/'} className={`flex items-center gap-1`}>
        <img
          src={logo}
          alt={'logo'}
          className={cx(
            css`
              &.initial {
                width: 2.5rem;
              }
              &.overlay {
                width: 24rem;
              }
            `,
            className
          )}
        />
        <h2
          className={cx(
            css`
              display: ${className === 'overlay' ? 'none' : 'block'};
            `,
            'text-xl'
          )}
        >
          Make YourSelf
        </h2>
      </Link> */}
    </header>
  );
};

export {Header};
