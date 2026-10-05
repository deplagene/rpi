import React, { useState } from 'react';
import './Header.css';

export default function Header({
  activeTab,
  onTabChange,
  onOpenBooking,
  imageSourceMode,
  onToggleImageSource
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'lecturers', label: 'Лекторы' },
    { id: 'partners', label: 'Партнеры' },
    { id: 'about', label: 'О нас' },
    { id: 'calculator', label: 'Калькулятор' },
    { id: 'faq', label: 'Вопросы и ответы' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const handleNavClick = (id) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container container">
        <div className="header-left">
          <button
            className="header-logo"
            onClick={() => handleNavClick('home')}
            aria-label="На главную"
          >
            <div className="logo-icon">
              <span>🎓</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">Учебная Платформа</span>
              <span className="logo-tagline">Преподавание дисциплин</span>
            </div>
          </button>
        </div>

        <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-right">
          <button
            className="cloud-toggle-btn"
            onClick={onToggleImageSource}
            title="Переключить источник фотографий преподавателей"
          >
            <span className="cloud-indicator" />
            <span className="cloud-text">
              {imageSourceMode === 'cloud' ? '☁️ Yandex Cloud' : '💻 Local Storage'}
            </span>
          </button>

          <button
            className="btn btn-primary btn-sm header-cta"
            onClick={() => onOpenBooking()}
          >
            Записаться
          </button>

          <button
            className="burger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Открыть меню"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </div>
    </header>
  );
}
