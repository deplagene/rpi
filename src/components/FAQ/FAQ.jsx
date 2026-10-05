import React, { useState } from 'react';
import './FAQ.css';
import { FAQ_DATA } from '../../data/siteExtraData';

export default function FAQ() {
  const [openIds, setOpenIds] = useState(['f1']);

  const toggleItem = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Частые вопросы</span>
          <h2 className="section-title">Вопросы и ответы</h2>
          <p className="section-subtitle">
            Всё, что вам нужно знать об организации обучения, оплате и форматах работы
          </p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
