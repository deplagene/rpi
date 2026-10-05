import React, { useState } from 'react';
import './Calculator.css';

export default function Calculator({ lecturers, onBookWithCalculation }) {
  const [lecturerId, setLecturerId] = useState(lecturers[0].id);
  const [lessonCount, setLessonCount] = useState(8);
  const [format, setFormat] = useState('online');
  const [isCorporate, setIsCorporate] = useState(false);

  const selectedLecturer =
    lecturers.find((l) => l.id === Number(lecturerId)) || lecturers[0];

  // Base individual single lesson price
  const basePricePerLesson = selectedLecturer.tariffs[0].price;

  // Calculate discount based on quantity
  let discountPercent = 0;
  if (lessonCount >= 16) {
    discountPercent = 20;
  } else if (lessonCount >= 12) {
    discountPercent = 15;
  } else if (lessonCount >= 8) {
    discountPercent = 10;
  } else if (lessonCount >= 4) {
    discountPercent = 5;
  }

  // Offline surcharge
  const offlineMultiplier = format === 'offline' ? 1.2 : 1.0;

  // Corporate multiplier
  const corporateMultiplier = isCorporate ? 1.3 : 1.0;

  const rawTotal = basePricePerLesson * lessonCount * offlineMultiplier * corporateMultiplier;
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalPrice = Math.round(rawTotal - discountAmount);

  const handleBook = () => {
    onBookWithCalculation(selectedLecturer, {
      title: `Индивидуальный расчет: ${lessonCount} занятий (${format === 'online' ? 'онлайн' : 'оффлайн'})`,
      price: finalPrice
    });
  };

  return (
    <section className="section calculator-section" id="calculator">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Калькулятор обучения</span>
          <h2 className="section-title">Рассчитайте стоимость персональной программы</h2>
          <p className="section-subtitle">
            Выберите преподавателя, количество часов и формат занятий. Система автоматически
            применит скидку на объемные пакеты.
          </p>
        </div>

        <div className="calc-card">
          <div className="calc-inputs">
            {/* Lecturer Picker */}
            <div className="calc-group">
              <label className="calc-label">Преподаватель:</label>
              <select
                className="form-control"
                value={lecturerId}
                onChange={(e) => setLecturerId(e.target.value)}
              >
                {lecturers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.fullName} ({l.categoryName}) — от {l.tariffs[0].price} ₽/час
                  </option>
                ))}
              </select>
            </div>

            {/* Lesson Count Buttons */}
            <div className="calc-group">
              <div className="calc-label-row">
                <span className="calc-label">Количество занятий (по 60 мин):</span>
                <span className="calc-count-badge">{lessonCount} занятий</span>
              </div>
              <div className="count-buttons-grid">
                {[1, 4, 8, 12, 16].map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={`count-btn ${lessonCount === count ? 'active' : ''}`}
                    onClick={() => setLessonCount(count)}
                  >
                    {count} {count === 1 ? 'урок' : count < 5 ? 'урока' : 'уроков'}
                    {count >= 4 && (
                      <span className="count-discount">
                        -{count === 4 ? '5%' : count === 8 ? '10%' : count === 12 ? '15%' : '20%'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Format & Type */}
            <div className="calc-row-2">
              <div className="calc-group">
                <label className="calc-label">Формат обучения:</label>
                <div className="calc-toggle">
                  <button
                    type="button"
                    className={`calc-toggle-btn ${format === 'online' ? 'active' : ''}`}
                    onClick={() => setFormat('online')}
                  >
                    🌐 Онлайн
                  </button>
                  <button
                    type="button"
                    className={`calc-toggle-btn ${format === 'offline' ? 'active' : ''}`}
                    onClick={() => setFormat('offline')}
                  >
                    🏢 Оффлайн (+20%)
                  </button>
                </div>
              </div>

              <div className="calc-group">
                <label className="calc-label">Заказчик:</label>
                <div className="calc-toggle">
                  <button
                    type="button"
                    className={`calc-toggle-btn ${!isCorporate ? 'active' : ''}`}
                    onClick={() => setIsCorporate(false)}
                  >
                    👤 Физ. лицо
                  </button>
                  <button
                    type="button"
                    className={`calc-toggle-btn ${isCorporate ? 'active' : ''}`}
                    onClick={() => setIsCorporate(true)}
                  >
                    🏢 Организация
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="calc-summary">
            <h3 className="summary-title">Ваш персональный расчет</h3>

            <div className="summary-lecturer-info">
              <span className="summary-lect-name">{selectedLecturer.fullName}</span>
              <span className="summary-lect-degree">{selectedLecturer.degree}</span>
            </div>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Базовая ставка:</span>
                <span>{basePricePerLesson.toLocaleString('ru-RU')} ₽ / час</span>
              </div>
              <div className="summary-row">
                <span>Количество уроков:</span>
                <span>{lessonCount} ак. часов</span>
              </div>
              <div className="summary-row">
                <span>Формат:</span>
                <span>{format === 'online' ? 'Онлайн' : 'Очный (с выездом)'}</span>
              </div>
              {discountPercent > 0 && (
                <div className="summary-row discount-row">
                  <span>Скидка за объем ({discountPercent}%):</span>
                  <span>-{discountAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
            </div>

            <div className="summary-total-box">
              <div className="total-label">Итого со скидкой:</div>
              <div className="total-price">{finalPrice.toLocaleString('ru-RU')} ₽</div>
              <div className="per-lesson-price">
                ≈ {Math.round(finalPrice / lessonCount).toLocaleString('ru-RU')} ₽ за занятие
              </div>
            </div>

            <button className="btn btn-primary btn-lg calc-cta-btn" onClick={handleBook}>
              Забронировать курс
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
