import React from 'react';
import './Partners.css';
import { PARTNERS_DATA } from '../../data/partnersData';

export default function Partners({ onBecomePartner }) {
  return (
    <section className="section partners-section" id="partners">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Сотрудничество</span>
          <h2 className="section-title">Нам доверяют лидеры индустрии и образования</h2>
          <p className="section-subtitle">
            Корпорации и ведущие университеты заказывают у наших лекторов авторские программы,
            курсы повышения квалификации и интенсивные образовательные треки.
          </p>
        </div>

        <div className="partners-grid">
          {PARTNERS_DATA.map((partner) => (
            <div key={partner.id} className="partner-card">
              <div className="partner-top">
                <div
                  className="partner-logo-pill"
                  style={{ borderColor: partner.tagColor }}
                >
                  <span className="partner-logo-text" style={{ color: partner.tagColor }}>
                    {partner.logoText}
                  </span>
                </div>
                <span className="partner-badge">{partner.badge}</span>
              </div>

              <h3 className="partner-name">{partner.name}</h3>
              <p className="partner-desc">{partner.description}</p>

              <div className="partner-footer">
                <span className="cooperation-tag">🤝 {partner.cooperation}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="partner-cta-box">
          <div className="cta-box-text">
            <h3>Хотите организовать обучение для сотрудников вашей компании?</h3>
            <p>Подберем лектора под стек вашей команды и составим индивидуальную программу.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={onBecomePartner}>
            Стать партнером
          </button>
        </div>
      </div>
    </section>
  );
}
