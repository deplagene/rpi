import React, { useState } from 'react';
import LecturerImage from './LecturerImage';

export default function LecturerCard({
  lecturer,
  onBook,
  imageSourceMode
}) {
  const [activeDiscIndex, setActiveDiscIndex] = useState(0);

  const activeDiscipline = lecturer.disciplines[activeDiscIndex] || lecturer.disciplines[0];

  return (
    <div className="figma-lecturer-card">
      {/* Top Part matching Figma: Photo on Left, Bio on Right */}
      <div className="card-top-grid">
        <div className="card-photo-col">
          <div className="photo-placeholder-box">
            <LecturerImage
              photo={lecturer.photo}
              cloudPhoto={lecturer.cloudPhoto}
              alt={lecturer.fullName}
              imageSourceMode={imageSourceMode}
            />
          </div>
        </div>

        <div className="card-info-col">
          <h3 className="lecturer-name-title">{lecturer.fullName}</h3>

          <div className="lecturer-details-list">
            <div className="detail-row">
              <span className="detail-label">Образование:</span>
              <span className="detail-value">{lecturer.education}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Стаж:</span>
              <span className="detail-value">{lecturer.experience} лет</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Учёная степень:</span>
              <span className="detail-value">{lecturer.degree}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part matching Figma: "Блок для заполнения по своему усмотрению" */}
      <div className="card-bottom-block">
        <div className="block-header">
          <h4 className="block-title">Преподаваемые дисциплины:</h4>
        </div>

        {/* Tabs for disciplines */}
        <div className="disciplines-tabs-row">
          {lecturer.disciplines.map((disc, idx) => (
            <button
              key={disc.id}
              className={`disc-pill-btn ${idx === activeDiscIndex ? 'active' : ''}`}
              onClick={() => setActiveDiscIndex(idx)}
            >
              {disc.title}
            </button>
          ))}
        </div>

        {/* Selected discipline description and all 10 topics */}
        <div className="discipline-body-box">
          <p className="discipline-summary">
            ● <strong>{activeDiscipline.title}</strong> — {activeDiscipline.description}
          </p>

          <ol className="ten-topics-list">
            {activeDiscipline.topics.map((topic, i) => (
              <li key={i} className="topic-list-item">
                <span className="topic-text-content">{topic}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tariffs and Booking Button */}
        <div className="card-tariffs-wrap">
          <h4 className="tariffs-heading">Тарифы:</h4>
          <div className="tariffs-row-grid">
            {lecturer.tariffs.map((t, idx) => (
              <div key={idx} className="tariff-box">
                <span className="tariff-title-text">{t.title}</span>
                <span className="tariff-price-text">{t.price.toLocaleString('ru-RU')} ₽</span>
                <button
                  className="btn-select-tariff"
                  onClick={() => onBook(lecturer, t)}
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
