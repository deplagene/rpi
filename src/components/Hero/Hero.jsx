import React from 'react';
import './Hero.css';
import { PLATFORM_STATS } from '../../data/siteExtraData';

export default function Hero({ onFindLecturer, onLearnMore }) {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse" />
            <span>Онлайн и оффлайн обучение от ведущих экспертов</span>
          </div>

          <h1 className="hero-title">
            Наши лекторы — признанные специалисты в своих областях, готовые делиться опытом и знаниями.
          </h1>

          <p className="hero-description">
            Учебная платформа предоставляет онлайн/оффлайн услуги физическим и юридическим лицам
            по преподаванию фундаментальных и прикладных дисциплин. Программы от кандидатов наук
            и ведущих практиков ведущих вузов страны.
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-primary btn-lg hero-find-btn"
              onClick={onFindLecturer}
            >
              НАЙТИ ЛЕКТОРА
              <span className="btn-arrow">→</span>
            </button>

            <button
              className="btn btn-secondary btn-lg"
              onClick={onLearnMore}
            >
              Узнать о платформе
            </button>
          </div>
        </div>

        <div className="hero-stats-grid">
          {PLATFORM_STATS.map((stat, idx) => (
            <div key={idx} className="hero-stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-desc">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
