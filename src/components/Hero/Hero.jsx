import React from 'react';
import Header from '../Header/Header';
import './Hero.css';

export default function Hero({
  activeSection,
  onNavigate,
  imageSourceMode,
  onToggleImageSource,
  onFindLecturer
}) {
  return (
    <div className="figma-frame-wrap" id="home">
      <span className="frame-tag-label">Главная</span>

      <div className="figma-card figma-hero-card">
        {/* Top Header Pill Bar inside Frame */}
        <Header
          activeSection={activeSection}
          onNavigate={onNavigate}
          imageSourceMode={imageSourceMode}
          onToggleImageSource={onToggleImageSource}
        />

        {/* Hero Content: Photo on Left, Text + Button on Right */}
        <div className="hero-content-grid">
          <div className="hero-classroom-col">
            <img
              src="/hero_classroom.png"
              alt="Учебный процесс и лекция"
              className="classroom-img"
            />
          </div>

          <div className="hero-text-col">
            <h1 className="hero-headline">
              Наши лекторы — признанные специалисты в своих областях, готовые делиться опытом и знаниями.
            </h1>

            <div className="hero-action-row">
              <button
                className="hero-find-link"
                onClick={onFindLecturer}
                title="Перейти к списку лекторов"
              >
                НАЙТИ ЛЕКТОРА
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
