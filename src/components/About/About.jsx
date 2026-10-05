import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <h2 className="about-heading">О нас</h2>
        <div className="about-text-content">
          <p className="about-paragraph">
            Наша учебная платформа соединяет компании, образовательные учреждения и НКО с профессиональными лекторами, спикерами и тренерами.
          </p>
          <p className="about-paragraph">
            Мы упрощаем процесс подбора, бронирования и организации лекций, помогая находить экспертов, которые не просто делятся знаниями, но и вдохновляют аудиторию.
          </p>
        </div>
      </div>
    </section>
  );
}
