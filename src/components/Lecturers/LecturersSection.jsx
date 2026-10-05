import React, { useState } from 'react';
import LecturerCard from './LecturerCard';
import LecturerImage from './LecturerImage';

export default function LecturersSection({
  lecturers,
  onBookLecturer,
  imageSourceMode
}) {
  const [selectedLecturerId, setSelectedLecturerId] = useState(1);
  const [viewMode, setViewMode] = useState('single'); // 'single' (exact Figma frame) or 'all'

  const menLecturers = lecturers.filter((l) => l.gender === 'male');
  const womenLecturers = lecturers.filter((l) => l.gender === 'female');

  const activeLecturer =
    lecturers.find((l) => l.id === selectedLecturerId) || lecturers[0];

  return (
    <section className="lecturers-section" id="lecturers">
      <div className="container lecturers-container">
        <div className="lecturers-header-row">
          <h2 className="lecturers-heading">Лекторы и лекции</h2>

          <div className="view-mode-toggle">
            <button
              className={`toggle-btn ${viewMode === 'single' ? 'active' : ''}`}
              onClick={() => setViewMode('single')}
            >
              Карточка по макету
            </button>
            <button
              className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              Все 10 преподавателей
            </button>
          </div>
        </div>

        {/* 1 2 3 4 5 grid selector matching Page 2 of PDF */}
        <div className="lecturers-nav-gallery">
          <div className="gallery-group">
            <span className="gallery-group-title">Мужчины:</span>
            <div className="gallery-thumbs-row">
              {menLecturers.map((lect, idx) => (
                <button
                  key={lect.id}
                  className={`gallery-thumb-item ${lect.id === selectedLecturerId ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLecturerId(lect.id);
                    if (viewMode === 'all') setViewMode('single');
                  }}
                  title={lect.fullName}
                >
                  <div className="thumb-img-wrap">
                    <LecturerImage
                      photo={lect.photo}
                      cloudPhoto={lect.cloudPhoto}
                      alt={lect.fullName}
                      imageSourceMode={imageSourceMode}
                    />
                    <span className="thumb-number">{idx + 1}</span>
                  </div>
                  <span className="thumb-short-name">
                    {lect.fullName.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-group">
            <span className="gallery-group-title">Женщины:</span>
            <div className="gallery-thumbs-row">
              {womenLecturers.map((lect, idx) => (
                <button
                  key={lect.id}
                  className={`gallery-thumb-item ${lect.id === selectedLecturerId ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLecturerId(lect.id);
                    if (viewMode === 'all') setViewMode('single');
                  }}
                  title={lect.fullName}
                >
                  <div className="thumb-img-wrap">
                    <LecturerImage
                      photo={lect.photo}
                      cloudPhoto={lect.cloudPhoto}
                      alt={lect.fullName}
                      imageSourceMode={imageSourceMode}
                    />
                    <span className="thumb-number">{idx + 1}</span>
                  </div>
                  <span className="thumb-short-name">
                    {lect.fullName.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Lecturer Frame matching Figma */}
        {viewMode === 'single' ? (
          <div className="single-card-wrap">
            <LecturerCard
              lecturer={activeLecturer}
              onBook={onBookLecturer}
              imageSourceMode={imageSourceMode}
            />
          </div>
        ) : (
          <div className="all-cards-stack">
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
    </section>
  );
}
