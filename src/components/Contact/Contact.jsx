import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      alert('Пожалуйста, укажите имя и контакты.');
      return;
    }
    setSent(true);
  };

  return (
    <section className="section contact-section" id="contacts">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-tag">Свяжитесь с нами</span>
            <h2 className="section-title contact-title">Остались вопросы или хотите индивидуальное КП?</h2>
            <p className="contact-desc">
              Наша команда методистов поможет составить корпоративную программу, подобрать
              спикеров под конференцию или организовать очные лекции в вашем учреждении.
            </p>

            <div className="contact-details-list">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <strong>Центральный офис:</strong>
                  <p>г. Москва, ул. Академика Королева, д. 12</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">📞</span>
                <div>
                  <strong>Телефон для связи:</strong>
                  <p>+7 (800) 555-35-35 (Бесплатно по РФ)</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">✉️</span>
                <div>
                  <strong>Электронная почта:</strong>
                  <p>partners@edu-platform.ru</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">⏱️</span>
                <div>
                  <strong>Режим работы:</strong>
                  <p>Пн–Пт с 09:00 до 20:00 (МСК)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            {sent ? (
              <div className="contact-sent-box">
                <span className="sent-icon">✉️</span>
                <h3>Спасибо за обращение!</h3>
                <p>Мы свяжемся с вами в течение рабочего дня по указанным контактам.</p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSent(false)}
                >
                  Отправить еще сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-card-title">Быстрая консультация</h3>
                <p className="form-card-subtitle">
                  Оставьте контакты, и мы ответим на любые вопросы по сотрудничеству.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="c-name">
                    Ваше имя или название компании:
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Например, Анна или ООО «Альфа»"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="c-contact">
                    Телефон или Telegram / Email:
                  </label>
                  <input
                    id="c-contact"
                    type="text"
                    required
                    className="form-control"
                    placeholder="+7 (999) 000-00-00 или @username"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="c-msg">
                    Тема вопроса или пожелания:
                  </label>
                  <textarea
                    id="c-msg"
                    rows="3"
                    className="form-control textarea"
                    placeholder="Какая дисциплина вас интересует, сколько человек планирует обучаться..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg contact-submit-btn">
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
