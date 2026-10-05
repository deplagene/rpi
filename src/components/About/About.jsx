import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="figma-frame-wrap" id="about">
      <span className="frame-tag-label">О нас</span>

      <div className="figma-card figma-about-card">
        <div className="about-text-wrapper">
          <p className="about-mockup-text">
            Наша учебная платформа  соединяет компании,<br />
            образовательные учреждения и НКО<br />
            с профессиональными лекторами, спикерами и тренерами<br />
            Мы упрощаем процесс подбора, бронирования<br />
            и организации лекций, помогая находить экспертов,<br />
            которые не просто делятся знаниями, но и вдохновляют<br />
            аудиторию.
          </p>
        </div>
      </div>
    </div>
  );
}
