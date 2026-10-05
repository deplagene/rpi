import React from 'react';
import './Footer.css';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-emoji">🎓</span>
            <span className="logo-brand">Учебная Платформа</span>
          </div>
          <p className="footer-desc">
            Онлайн и оффлайн услуги физическим и юридическим лицам по преподаванию дисциплин.
            Эксперты ведущих университетов страны.
          </p>
          <div className="footer-cloud-badge">
            ☁️ Поддержка облачного хранилища фото (Yandex Cloud)
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Навигация</h4>
          <ul className="footer-links">
            <li><button onClick={() => onNavigate('home')}>Главная</button></li>
            <li><button onClick={() => onNavigate('lecturers')}>Каталог лекторов</button></li>
            <li><button onClick={() => onNavigate('partners')}>Партнеры и клиенты</button></li>
            <li><button onClick={() => onNavigate('about')}>О платформе</button></li>
            <li><button onClick={() => onNavigate('calculator')}>Калькулятор стоимости</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Популярные дисциплины</h4>
          <ul className="footer-links">
            <li><span>Алгоритмы и Data Science</span></li>
            <li><span>Молекулярная биология</span></li>
            <li><span>Микро- и макроэкономика</span></li>
            <li><span>Архитектурное проектирование</span></li>
            <li><span>UX/UI дизайн в Figma</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Юридическая информация</h4>
          <p className="legal-text">
            Все программы лекций соответствуют академическим стандартам.
            Договор оферты и согласие на обработку персональных данных.
          </p>
          <div className="copyright">
            © {new Date().getFullYear()} Учебная платформа. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}
