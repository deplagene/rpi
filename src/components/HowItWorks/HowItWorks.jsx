import React from 'react';
import './HowItWorks.css';
import { STEPS_DATA } from '../../data/siteExtraData';

export default function HowItWorks({ onActionClick }) {
  return (
    <section className="section how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Простой процесс</span>
          <h2 className="section-title">Как начать обучение на платформе</h2>
          <p className="section-subtitle">
            Мы берем на себя всю организацию, документооборот и методическое согласование
          </p>
        </div>

        <div className="steps-grid">
          {STEPS_DATA.map((item, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number-pill">{item.step}</div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="steps-action-center">
          <button className="btn btn-primary btn-lg" onClick={onActionClick}>
            Подобрать лектора прямо сейчас
          </button>
        </div>
      </div>
    </section>
  );
}
