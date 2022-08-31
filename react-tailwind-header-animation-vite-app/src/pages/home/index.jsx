import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';

const HomePage = () => {
  return (
    <Layout>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full h-full relative mt-12`,
          css`
            min-height: 100vh;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">HomePage</h2>
      </section>
    </Layout>
  );
};

export {HomePage};
