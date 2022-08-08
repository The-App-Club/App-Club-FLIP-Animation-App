import {css, cx} from '@emotion/css';
import {Scrollbars} from 'rc-scrollbars';
const ScrollContainer = ({focused, children}) => {
  return (
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
            grid-template-columns: repeat(2, 1fr);
          }
          gap: 1rem;
          padding: 1rem;
          border: 1px solid darkgray;
        `}
      >
        {children}
      </div>
    </Scrollbars>
  );
};

export {ScrollContainer};
