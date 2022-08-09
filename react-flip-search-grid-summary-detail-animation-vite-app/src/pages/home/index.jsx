import {css} from '@emotion/css';
import {Grid} from '../../components/Grid';
import {Layout} from '../../layouts/default';

const HomePage = () => {
  return (
    <Layout>
      <div
        className={css`
          max-width: 60rem;
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 1rem;
          min-height: 100vh;
          @media (max-width: 768px) {
            padding-top: 1rem;
          }
        `}
      >
        <h2>HomePage</h2>
        <Grid />
      </div>
    </Layout>
  );
};

export {HomePage};
