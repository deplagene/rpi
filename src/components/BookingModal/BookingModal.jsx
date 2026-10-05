import React, { useState, useEffect } from 'react';
import './BookingModal.css';

export default function BookingModal({
  isOpen,
  onClose,
  lecturers,
  initialLecturer,
  initialTariff
}) {
  const [selectedLecturerId, setSelectedLecturerId] = useState(
    initialLecturer ? initialLecturer.id : lecturers[0].id
  );
  const [selectedDisciplineId, setSelectedDisciplineId] = useState('');
  const [selectedTariffTitle, setSelectedTariffTitle] = useState('');
  const [format, setFormat] = useState('online'); // online, offline
  const [clientType, setClientType] = useState('individual'); // individual, corporate
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialLecturer) {
      setSelectedLecturerId(initialLecturer.id);
      setSelectedDisciplineId(initialLecturer.disciplines[0].id);
      setSelectedTariffTitle(
        initialTariff ? initialTariff.title : initialLecturer.tariffs[0].title
      );
    } else if (lecturers && lecturers.length > 0) {
      const first = lecturers[0];
      setSelectedLecturerId(first.id);
      setSelectedDisciplineId(first.disciplines[0].id);
      setSelectedTariffTitle(first.tariffs[0].title);
    }
    setSubmitted(false);
  }, [initialLecturer, initialTariff, lecturers, isOpen]);

  // Update disciplines when lecturer changes
  const activeLecturer =
    lecturers.find((l) => l.id === Number(selectedLecturerId)) || lecturers[0];

  const handleLecturerChange = (id) => {
    setSelectedLecturerId(id);
    const lect = lecturers.find((l) => l.id === Number(id));
    if (lect) {
      setSelectedDisciplineId(lect.disciplines[0].id);
      setSelectedTariffTitle(lect.tariffs[0].title);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      alert('Пожалуйста, заполните обязательные поля: ФИО, телефон и email.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  const activeTariff =
    activeLecturer.tariffs.find((t) => t.title === selectedTariffTitle) ||
    activeLecturer.tariffs[0];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Закрыть">
          ✕
        </button>

        {submitted ? (
          <div className="booking-success-box">
            <span className="success-icon">🎉</span>
            <h2 className="success-title">Заявка успешно оформлена!</h2>
            <p className="success-desc">
              Спасибо, <strong>{fullName}</strong>! Мы забронировали для вас консультацию с лектором{' '}
              <strong>{activeLecturer.fullName}</strong>.
            </p>
            <div className="booking-summary-card">
              <div><strong>Тариф:</strong> {activeTariff.title} ({activeTariff.price.toLocaleString('ru-RU')} ₽)</div>
              <div><strong>Формат:</strong> {format === 'online' ? 'Дистанционный (онлайн)' : 'Очный (оффлайн)'}</div>
              <div><strong>Тип клиента:</strong> {clientType === 'individual' ? 'Физическое лицо' : `Юридическое лицо (${organization || 'Компания'})`}</div>
            </div>
            <p className="success-contact-note">
              Куратор свяжется с вами по номеру <strong>{phone}</strong> в течение 15 минут для согласования графика занятий.
            </p>
            <button className="btn btn-primary" onClick={handleReset}>
              Отлично, понятно
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <span className="section-tag">Бронирование лекции</span>
              <h2 className="modal-title">Запись на обучение</h2>
              <p className="modal-subtitle">
                Заполните форму, и мы свяжемся с вами для согласования удобного расписания.
              </p>
            </div>

            <div className="modal-body booking-modal-body">
              {/* Client type radio */}
              <div className="form-group client-type-group">
                <label className="form-label">Тип заказчика:</label>
                <div className="type-toggle-pills">
                  <button
                    type="button"
                    className={`pill-toggle ${clientType === 'individual' ? 'active' : ''}`}
                    onClick={() => setClientType('individual')}
                  >
                    Физическое лицо
                  </button>
                  <button
                    type="button"
                    className={`pill-toggle ${clientType === 'corporate' ? 'active' : ''}`}
                    onClick={() => setClientType('corporate')}
                  >
                    Юридическое лицо / Вуз / НКО
                  </button>
                </div>
              </div>

              {/* Lecturer select */}
              <div className="form-group">
                <label className="form-label" htmlFor="lecturer-select">
                  Выберите преподавателя:
                </label>
                <select
                  id="lecturer-select"
                  className="form-control"
                  value={selectedLecturerId}
                  onChange={(e) => handleLecturerChange(e.target.value)}
                >
                  {lecturers.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.fullName} — {l.categoryName} ({l.degree})
                    </option>
                  ))}
                </select>
              </div>

              {/* Discipline select */}
              <div className="form-group">
                <label className="form-label" htmlFor="discipline-select">
                  Дисциплина / Курс:
                </label>
                <select
                  id="discipline-select"
                  className="form-control"
                  value={selectedDisciplineId}
                  onChange={(e) => setSelectedDisciplineId(e.target.value)}
                >
                  {activeLecturer.disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tariff & Format */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="tariff-select">
                    Тариф обучения:
                  </label>
                  <select
                    id="tariff-select"
                    className="form-control"
                    value={selectedTariffTitle}
                    onChange={(e) => setSelectedTariffTitle(e.target.value)}
                  >
                    {activeLecturer.tariffs.map((t, idx) => (
                      <option key={idx} value={t.title}>
                        {t.title} — {t.price.toLocaleString('ru-RU')} ₽
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Формат проведения:</label>
                  <div className="format-toggle">
                    <button
                      type="button"
                      className={`format-btn ${format === 'online' ? 'active' : ''}`}
                      onClick={() => setFormat('online')}
                    >
                      🌐 Онлайн
                    </button>
                    <button
                      type="button"
                      className={`format-btn ${format === 'offline' ? 'active' : ''}`}
                      onClick={() => setFormat('offline')}
                    >
                      🏢 Оффлайн
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Fields */}
              {clientType === 'corporate' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="org-input">
                    Название компании / учебного заведения:
                  </label>
                  <input
                    id="org-input"
                    type="text"
                    className="form-control"
                    placeholder="Например, ООО «ТехИнновации» или НИУ ВШЭ"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
              )}

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="name-input">
                    Ваше ФИО <span className="req">*</span>:
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Иван Иванов"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone-input">
                    Телефон <span className="req">*</span>:
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email-input">
                  Email для связи и материалов <span className="req">*</span>:
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="comment-input">
                  Пожелания к занятиям или удобные даты (необязательно):
                </label>
                <textarea
                  id="comment-input"
                  rows="2"
                  className="form-control textarea"
                  placeholder="Укажите ваш текущий уровень, цель обучения или удобные дни недели..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="booking-price-badge">
                <span>Итоговая стоимость тарифа:</span>
                <span className="total-amount">{activeTariff.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="btn btn-primary">
                Подтвердить запись
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
