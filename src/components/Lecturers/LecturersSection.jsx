import React, { useState } from 'react';
import LecturerCard from './LecturerCard';
import LecturerImage from './LecturerImage';
import './Lecturers.css';

export default function LecturersSection({
  lecturers,
  onBookLecturer,
  imageSourceMode
}) {
  const [selectedId, setSelectedId] = useState(1);
  const [viewMode, setViewMode] = useState('single');

  const menLecturers = lecturers.filter((l) => l.gender === 'male');
  const womenLecturers = lecturers.filter((l) => l.gender === 'female');

  const currentLecturer =
    lecturers.find((l) => l.id === selectedId) || lecturers[0];

  return (
    <div className="figma-frame-wrap" id="lecturers">
      <div className="frame-label-row">
        <span className="frame-tag-label">Лекторы</span>

        <div className="frame-view-toggle">
          <button
            className={`f-toggle-btn ${viewMode === 'single' ? 'active' : ''}`}
            onClick={() => setViewMode('single')}
          >
            Макет
          </button>
          <button
            className={`f-toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
            onClick={() => setViewMode('all')}
          >
            Все 10 лекторов
          </button>
        </div>
      </div>

      {/* Lecturers and lectures selector matching Page 2 of PDF */}
      <div className="pdf-lecturers-selector">
        <div className="selector-group">
          <span className="selector-label">Мужчины:</span>
          <div className="selector-items-row">
            {menLecturers.map((lect, i) => (
              <button
                key={lect.id}
                className={`selector-item ${lect.id === selectedId ? 'active' : ''}`}
                onClick={() => {
                  setSelectedId(lect.id);
                  if (viewMode === 'all') setViewMode('single');
                }}
              >
                <div className="avatar-box">
                  <LecturerImage
                    photo={lect.photo}
                    cloudPhoto={lect.cloudPhoto}
                    alt={lect.fullName}
                    imageSourceMode={imageSourceMode}
                  />
                  <span className="avatar-idx">{i + 1}</span>
                </div>
                <span className="avatar-surname">{lect.fullName.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="selector-group">
          <span className="selector-label">Женщины:</span>
          <div className="selector-items-row">
            {womenLecturers.map((lect, i) => (
              <button
                key={lect.id}
                className={`selector-item ${lect.id === selectedId ? 'active' : ''}`}
                onClick={() => {
                  setSelectedId(lect.id);
                  if (viewMode === 'all') setViewMode('single');
                }}
              >
                <div className="avatar-box">
                  <LecturerImage
                    photo={lect.photo}
                    cloudPhoto={lect.cloudPhoto}
                    alt={lect.fullName}
                    imageSourceMode={imageSourceMode}
                  />
                  <span className="avatar-idx">{i + 1}</span>
                </div>
                <span className="avatar-surname">{lect.fullName.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Figma Card */}
      <div className="figma-card figma-lecturer-card">
        {viewMode === 'single' ? (
          <LecturerCard
            lecturer={currentLecturer}
            onBook={onBookLecturer}
            imageSourceMode={imageSourceMode}
          />
        ) : (
          <div className="all-lecturers-stack">
            {lecturers.map((lect) => (
              <LecturerCard
                key={lect.id}
                lecturer={lect}
                onBook={onBookLecturer}
                imageSourceMode={imageSourceMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
