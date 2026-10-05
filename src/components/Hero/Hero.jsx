import React from 'react';
import './Hero.css';

export default function Hero({ onFindLecturer }) {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
        <h1 className="hero-heading">
          Наши лекторы — признанные специалисты в своих областях, готовые делиться опытом и знаниями.
        </h1>

        <div className="hero-btn-wrap">
          <button className="hero-cta-btn" onClick={onFindLecturer}>
            НАЙТИ ЛЕКТОРА
          </button>
        </div>
      </div>
    </section>
  );
}
