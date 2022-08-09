import {css} from '@emotion/css';
import {Link, useLocation} from 'react-router-dom';
import {ProductItem} from '../../components/ProductItem';
import {Layout} from '../../layouts/default';

const ProductPage = () => {
  const location = useLocation();
  const {pathname, state: selectedItem} = location;
  return (
    <Layout>
      <div
        className={css`
          max-width: 30rem;
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 1rem;
          min-height: 100vh;
        `}
      >
        <h2>ProductPage</h2>
        <ProductItem item={selectedItem} />
        <Link to={'/'}>Home</Link>
      </div>
    </Layout>
  );
};

export {ProductPage};
