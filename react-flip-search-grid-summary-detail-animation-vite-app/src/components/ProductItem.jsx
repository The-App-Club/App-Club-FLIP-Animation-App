import {css, cx} from '@emotion/css';
const ProductItem = ({item}) => {
  return (
    <div
      className={cx(css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h2 {
          font-size: 1.2rem;
        }
      `)}
    >
      <h2>{item.title}</h2>
      <img src={item.url} alt={''} width={300} />
      <p>{item.description}</p>
    </div>
  );
};

export {ProductItem};
