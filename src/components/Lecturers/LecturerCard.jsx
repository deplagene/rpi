import React, { useState } from 'react';
import LecturerImage from './LecturerImage';

export default function LecturerCard({
  lecturer,
  onOpenDetails,
  onBook,
  imageSourceMode
}) {
  const [selectedDisciplineId, setSelectedDisciplineId] = useState(lecturer.disciplines[0].id);

  const activeDiscipline =
    lecturer.disciplines.find((d) => d.id === selectedDisciplineId) ||
    lecturer.disciplines[0];

  return (
    <article className="lecturer-card">
      <div className="lecturer-header">
        <LecturerImage
          photo={lecturer.photo}
          cloudPhoto={lecturer.cloudPhoto}
          alt={lecturer.fullName}
          imageSourceMode={imageSourceMode}
        />

        <div className="lecturer-bio">
          <div className="lecturer-degree-row">
            <span className={`degree-badge ${lecturer.degree === 'нет' ? 'no-degree' : 'has-degree'}`}>
              {lecturer.degree === 'нет' ? 'Практикующий специалист' : lecturer.degree}
            </span>
            <span className="experience-badge">Стаж: {lecturer.experience} лет</span>
          </div>

          <h3 className="lecturer-fullname">{lecturer.fullName}</h3>

          <div className="lecturer-meta">
            <span className="meta-icon">🎓</span>
            <span className="meta-education">{lecturer.education}</span>
          </div>
        </div>
      </div>

      <div className="lecturer-disciplines-section">
        <div className="disciplines-label-row">
          <span className="disciplines-label">Преподаваемые дисциплины:</span>
          <span className="disciplines-count">{lecturer.disciplines.length} курса</span>
        </div>

        <div className="discipline-tabs">
          {lecturer.disciplines.map((disc) => (
            <button
              key={disc.id}
              className={`disc-tab ${disc.id === selectedDisciplineId ? 'active' : ''}`}
              onClick={() => setSelectedDisciplineId(disc.id)}
            >
              {disc.title}
            </button>
          ))}
        </div>

        <div className="discipline-preview-box">
          <p className="disc-desc">
            <strong>{activeDiscipline.title}</strong> — {activeDiscipline.description}
          </p>

          <div className="topics-preview-list">
            {activeDiscipline.topics.slice(0, 3).map((topic, i) => (
              <div key={i} className="topic-preview-item">
                <span className="topic-number">{i + 1}.</span>
                <span className="topic-text">{topic}</span>
              </div>
            ))}
          </div>

          <button
            className="view-all-topics-btn"
            onClick={() => onOpenDetails(lecturer, activeDiscipline.id)}
          >
            Смотреть все 10 лекций дисциплины →
          </button>
        </div>
      </div>

      <div className="lecturer-tariffs-section">
        <span className="tariffs-title">Стоимость и тарифы:</span>
        <div className="tariffs-grid">
          {lecturer.tariffs.map((tariff, idx) => (
            <div key={idx} className="tariff-card">
              <span className="tariff-name">{tariff.title}</span>
              <span className="tariff-price">{tariff.price.toLocaleString('ru-RU')} ₽</span>
              <button
                className="tariff-book-btn"
                onClick={() => onBook(lecturer, tariff)}
              >
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="lecturer-card-footer">
        <button
          className="btn btn-secondary card-details-btn"
          onClick={() => onOpenDetails(lecturer, activeDiscipline.id)}
        >
          Подробнее о лекторе и программе
        </button>
        <button
          className="btn btn-primary card-book-btn"
          onClick={() => onBook(lecturer, lecturer.tariffs[0])}
        >
          Записаться
        </button>
      </div>
    </article>
  );
}
