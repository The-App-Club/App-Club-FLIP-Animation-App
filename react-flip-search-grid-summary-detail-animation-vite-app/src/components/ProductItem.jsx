import {css, cx} from '@emotion/css';
const ProductItem = ({item}) => {
  return (
    <div
      className={cx(css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        h2 {
          font-size: 1.2rem;
        }
      `)}
    >
      <h2>{item.title}</h2>
      <img
        src={item.url}
        alt={''}
        className={css`
          width: 300px;
          @media (max-width: 768px) {
            width: 150px;
          }
        `}
      />
      <p>{item.description}</p>
    </div>
  );
};

export {ProductItem};
