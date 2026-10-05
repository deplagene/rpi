import React from 'react';
import './Header.css';

export default function Header({
  activeSection,
  onNavigate,
  imageSourceMode,
  onToggleImageSource
}) {
  const navLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'partners', label: 'Партнеры' },
    { id: 'about', label: 'О нас' },
    { id: 'lecturers', label: 'Лекторы' },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <div className="figma-header-bar">
      <nav className="header-links-group">
        {navLinks.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`header-nav-btn ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Addition answering Figma Comment #2: "Подумай, чем еще можно дополнить хэдер" */}
      <div className="header-extra-tools">
        <button
          className="header-cloud-toggle"
          onClick={onToggleImageSource}
          title="Бонусное задание: переключение источника фото (Yandex Cloud / Локально)"
        >
          <span className="dot-status" />
          <span>{imageSourceMode === 'cloud' ? 'Yandex Cloud' : 'Локально'}</span>
        </button>
      </div>
    </div>
  );
}
