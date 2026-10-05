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
    <div className="figma-lecturer-inner">
      {/* Top Part matching Figma Screenshot 2 */}
      <div className="lecturer-top-layout">
        {/* Left: место для фото преподавателя with BLUE line underneath */}
        <div className="photo-column-wrap">
          <div className="photo-frame-box">
            <LecturerImage
              photo={lecturer.photo}
              cloudPhoto={lecturer.cloudPhoto}
              alt={lecturer.fullName}
              imageSourceMode={imageSourceMode}
            />
            <div className="photo-label-overlay">
              <span>место для фото<br />преподавателя</span>
            </div>
          </div>
          <div className="photo-blue-underline" />
        </div>

        {/* Right: ФИО преподавателя. Подумайте чем ещё можно восполнить этот блок */}
        <div className="info-column-wrap">
          <h3 className="lecturer-fullname-mockup">{lecturer.fullName}</h3>

          {/* Filled content for Figma Comment #4 */}
          <div className="lecturer-filled-meta">
            <p><strong>Образование:</strong> {lecturer.education}</p>
            <p><strong>Стаж:</strong> {lecturer.experience} лет</p>
            <p><strong>Учёная степень:</strong> {lecturer.degree}</p>
          </div>
        </div>
      </div>

      {/* Bottom Part matching Figma Screenshot 2: "Блок для заполнения по своему усмотрению" */}
      <div className="lecturer-bottom-layout">
        <h4 className="custom-block-mockup-title">
          Блок для заполнения по своему усмотрению:
        </h4>

        {/* Filled content for Figma Comment #5: Disciplines + 10 Topics + Tariffs */}
        <div className="custom-block-content">
          <div className="disciplines-pills-bar">
            {lecturer.disciplines.map((disc, idx) => (
              <button
                key={disc.id}
                className={`disc-btn ${idx === activeDiscIndex ? 'active' : ''}`}
                onClick={() => setActiveDiscIndex(idx)}
              >
                {disc.title}
              </button>
            ))}
          </div>

          <div className="disc-syllabus-box">
            <p className="disc-lead">
              ● <strong>{activeDiscipline.title}</strong> — {activeDiscipline.description}
            </p>

            <ol className="topics-ordered-list">
              {activeDiscipline.topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          </div>

          {/* Tariffs & Booking */}
          <div className="tariffs-bottom-bar">
            <div className="tariffs-cards-grid">
              {lecturer.tariffs.map((tariff, i) => (
                <div key={i} className="tariff-card-item">
                  <span className="tariff-label">{tariff.title}</span>
                  <span className="tariff-val">{tariff.price.toLocaleString('ru-RU')} ₽</span>
                  <button
                    className="tariff-action-btn"
                    onClick={() => onBook(lecturer, tariff)}
                  >
                    Записаться
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
