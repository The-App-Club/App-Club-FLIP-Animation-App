import {AnimatePresence} from 'framer-motion';
import {LoremIpsum} from 'react-lorem-ipsum';
import {css} from '@emotion/css';
import {default as Layout} from '../layouts/default';

const Description = ({tik}) => {
  return (
    <div
      className={css`
        min-height: 8rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        padding: 1rem;
      `}
    >
      {
        <AnimatePresence>
          {tik && (
            <Layout>
              <LoremIpsum p={3} avgSentencesPerParagraph={1} />
            </Layout>
          )}
        </AnimatePresence>
      }
    </div>
  );
};

export {Description};
