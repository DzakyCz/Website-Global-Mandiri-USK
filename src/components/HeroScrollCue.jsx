'use client';

import ArrowIcon from './icons/ArrowIcon';

export default function HeroScrollCue() {
  return (
    <a
      href="#about"
      className="hero-scroll"
      data-reveal="rise"
      onClick={(event) => {
        const about = document.getElementById('about');
        if (!about) return;
        event.preventDefault();
        about.scrollIntoView();
      }}
    >
      <span className="scroll-mark"><ArrowIcon direction="down" /></span><span>Scroll to explore</span>
    </a>
  );
}
