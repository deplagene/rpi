import React from 'react';
import './About.css';

export default function About({ onExploreLecturers, onContactUs }) {
  const features = [
    {
      icon: "🏢",
      title: "Для компаний и бизнеса",
      desc: "Корпоративное обучение специалистов, воркшопы, разработка авторских спецкурсов под стек вашей компании с закрывающими документами."
    },
    {
      icon: "🎓",
      title: "Для студентов и абитуриентов",
      desc: "Фундаментальная подготовка к сессиям, олимпиадам и ЕГЭ, освоение востребованных профессий от практикующих преподавателей."
    },
    {
      icon: "🌐",
      title: "Онлайн и оффлайн форматы",
      desc: "Удобные интерактивные занятия через веб-платформу или очные мастер-классы и тренинги в аудиториях вашего города."
    },
    {
      icon: "📜",
      title: "Академический уровень",
      desc: "Преподаватели из МФТИ, МГУ, ВШЭ, МГИМО и СПбГАСУ — кандидаты и доктора наук с практическим опытом в индустрии."
    }
  ];

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-banner">
          <div className="about-content">
            <span className="section-tag">О платформе</span>
            <h2 className="about-title">
              Наша учебная платформа соединяет компании, образовательные учреждения и НКО с профессиональными лекторами, спикерами и тренерами.
            </h2>
            <p className="about-text">
              Мы упрощаем процесс подбора, бронирования и организации лекций, помогая находить экспертов, которые не просто делятся знаниями, но и вдохновляют аудиторию.
            </p>
            <div className="about-buttons">
              <button className="btn btn-primary" onClick={onExploreLecturers}>
                Каталог лекторов
              </button>
              <button className="btn btn-secondary" onClick={onContactUs}>
                Заказать обучение
              </button>
            </div>
          </div>
        </div>

        <div className="about-features-grid">
          {features.map((feat, index) => (
            <div key={index} className="about-feature-card">
              <div className="feature-icon">{feat.icon}</div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
