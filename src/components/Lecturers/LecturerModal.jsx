import React, { useState, useEffect } from 'react';
import LecturerImage from './LecturerImage';

export default function LecturerModal({
  lecturer,
  initialDisciplineId,
  isOpen,
  onClose,
  onBook,
  imageSourceMode
}) {
  const [activeDiscId, setActiveDiscId] = useState(
    initialDisciplineId || (lecturer ? lecturer.disciplines[0].id : null)
  );

  useEffect(() => {
    if (initialDisciplineId) {
      setActiveDiscId(initialDisciplineId);
    } else if (lecturer) {
      setActiveDiscId(lecturer.disciplines[0].id);
    }
  }, [initialDisciplineId, lecturer]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lecturer) return null;

  const currentDiscipline =
    lecturer.disciplines.find((d) => d.id === activeDiscId) || lecturer.disciplines[0];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container lecturer-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Закрыть">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-lecturer-profile">
            <LecturerImage
              photo={lecturer.photo}
              cloudPhoto={lecturer.cloudPhoto}
              alt={lecturer.fullName}
              imageSourceMode={imageSourceMode}
              className="modal-photo"
            />
            <div className="modal-profile-text">
              <div className="modal-badges">
                <span className="degree-badge">{lecturer.degree === 'нет' ? 'Практикующий специалист' : lecturer.degree}</span>
                <span className="experience-badge">Стаж: {lecturer.experience} лет</span>
              </div>
              <h2 className="modal-title">{lecturer.fullName}</h2>
              <p className="modal-education">🎓 {lecturer.education}</p>
              <p className="modal-category">📚 Направление: {lecturer.categoryName}</p>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <h3 className="modal-subtitle">Программа учебных курсов (все 10 тем по каждому предмету):</h3>

          <div className="modal-disc-tabs">
            {lecturer.disciplines.map((d) => (
              <button
                key={d.id}
                className={`modal-disc-tab ${d.id === activeDiscId ? 'active' : ''}`}
                onClick={() => setActiveDiscId(d.id)}
              >
                {d.title}
              </button>
            ))}
          </div>

          <div className="modal-topics-card">
            <div className="topics-card-header">
              <h4>{currentDiscipline.title}</h4>
              <p className="topics-card-desc">{currentDiscipline.description}</p>
            </div>

            <div className="full-topics-list">
              {currentDiscipline.topics.map((topic, idx) => (
                <div key={idx} className="full-topic-item">
                  <span className="topic-badge">Лекция {idx + 1}</span>
                  <span className="topic-name">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-tariffs-block">
            <h4 className="tariffs-block-title">Тарифы на обучение у данного преподавателя:</h4>
            <div className="modal-tariffs-grid">
              {lecturer.tariffs.map((t, i) => (
                <div key={i} className="modal-tariff-item">
                  <div className="tariff-info">
                    <span className="tariff-type-title">{t.title}</span>
                    <span className="tariff-amount">{t.price.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      onClose();
                      onBook(lecturer, t);
                    }}
                  >
                    Записаться
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Закрыть
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onBook(lecturer, lecturer.tariffs[0]);
            }}
          >
            Записаться к лектору
          </button>
        </div>
      </div>
    </div>
  );
}
