import HeroScrollCue from './HeroScrollCue';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-eyebrow" data-reveal="rise">HOLDING COMPANY OF SYIAH KUALA UNIVERSITY</p>
        <h1>PT GLOBAL<br />MANDIRI USK</h1>
        <p className="hero-slogan" data-reveal="rise">TOGERTHER WE GROW, TOGETHER WE SHINE</p>
        <HeroScrollCue />
      </div>
    </section>
  );
}
