import {css, cx} from '@emotion/css';
import {gsap} from 'gsap';
import {Flip} from 'gsap/Flip';
import {memo, useEffect, useRef, useState} from 'react';
import {motion, useAnimationControls} from 'framer-motion';
import logo from '../assets/logo.png';

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
const initial = css`
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
  background-color: #fff;

  img {
    order: 2;
  }

  h2 {
    order: 1;
  }
`;

const initialHeaderLogo = css`
  width: 24rem;
  height: 24rem;
  @media (max-width: 768px) {
    width: 18rem;
    height: 18rem;
  }
`;

const initialHeaderTitle = css`
  font-size: 2.25rem /* 36px */;
  line-height: 2.5rem /* 40px */;
`;

const animate = css`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  @media (max-width: 768px) {
    display: initial;
    align-items: initial;
    gap: initial;
  }
  background-color: #fff;
`;

const animateHeaderLogo = css`
  width: 2.5rem;
  height: 2.5rem;
`;

const animateHeaderTitle = css`
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
`;

const CowboyBebop = ({fullScreen, notifier}) => {
  const headerTitleControls = useAnimationControls();

  const headerDomRef = useRef(null);
  const headerLogoDomRef = useRef(null);
  const headerTitleDomRef = useRef(null);

  useEffect(() => {
    if (fullScreen) {
      return;
    }
    gsap.registerPlugin(Flip);
    const headerDom = headerDomRef.current;
    const headerLogoDom = headerLogoDomRef.current;
    const headerTitleDom = headerTitleDomRef.current;
    // get the current state
    const headerState = Flip.getState(headerDom);
    const headerLogoState = Flip.getState(headerLogoDom);
    const headerTitleState = Flip.getState(headerTitleDom);

    // make state changes. We'll toggle a class, for example:
    headerDom.classList.remove(initial);
    headerDom.classList.add(animate);

    headerLogoDom.classList.remove(initialHeaderLogo);
    headerLogoDom.classList.add(animateHeaderLogo);

    headerTitleDom.classList.remove(initialHeaderTitle);
    headerTitleDom.classList.add(animateHeaderTitle);

    // animate from the previous state to the current one:
    Flip.from(headerState, {
      duration: 1,
      ease: 'power1.inOut',
      absolute: true,
      onStart: function () {
        console.log(`[start]`, `header`);
      },
      onComplete: function () {
        console.log(`[complete]`, `header`);
      },
    });
    Flip.from(headerLogoState, {
      duration: 1,
      ease: 'power1.inOut',
      absolute: false,
      onStart: function () {
        console.log(`[start]`, `headerLogo`);
      },
      onComplete: function () {
        console.log(`[complete]`, `headerLogo`);
      },
    });
    Flip.from(headerTitleState, {
      duration: 1,
      ease: 'power1.inOut',
      absolute: false,
      onStart: function () {
        console.log(`[start]`, `headerTitle`);
      },
      onComplete: function () {
        console.log(`[complete]`, `headerTitle`);
        headerTitleControls.start('animate');
        headerDom.classList.add(css`
          display: flex;
          align-items: center;
          gap: 0.5rem;
        `);
        notifier();
      },
    });
  }, [fullScreen]);

  return (
    <motion.header
      ref={headerDomRef}
      className={initial}
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
    >
      <img
        ref={headerLogoDomRef}
        className={initialHeaderLogo}
        src={logo}
        alt={'logo'}
      />
      <motion.h2
        ref={headerTitleDomRef}
        className={initialHeaderTitle}
        variants={motionConfig}
        initial={'initial'}
        animate={headerTitleControls}
        exit={'hide'}
        transition={{
          duration: 0.4,
          delay: 0.2,
          ease: 'easeInOut',
        }}
      >
        Make YourSelf
      </motion.h2>
    </motion.header>
  );
};

export default memo(CowboyBebop);
