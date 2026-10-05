import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header({
  activeSection,
  onNavigate,
  imageSourceMode,
  onToggleImageSource
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О нас' },
    { id: 'partners', label: 'Партнеры' },
    { id: 'lecturers', label: 'Лекторы' },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <nav className="header-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-item ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-cloud-ctrl">
          <button
            className="cloud-btn"
            onClick={onToggleImageSource}
            title="Переключить источник фотографий: Yandex Cloud или локальный диск"
          >
            <span className="cloud-dot" />
            <span>{imageSourceMode === 'cloud' ? 'Фото: Yandex Cloud' : 'Фото: Локально'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
