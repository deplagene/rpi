import React from 'react';
import './Reviews.css';
import { REVIEWS_DATA } from '../../data/siteExtraData';

export default function Reviews() {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Обратная связь</span>
          <h2 className="section-title">Что говорят наши слушатели и компании</h2>
          <p className="section-subtitle">
            Честные отзывы студентов, специалистов ведущих IT-компаний и корпоративных заказчиков
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS_DATA.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-top">
                <div className="review-avatar">{review.avatar}</div>
                <div className="review-author-meta">
                  <h4 className="review-author">{review.author}</h4>
                  <span className="review-role">{review.role}</span>
                </div>
                <div className="review-stars">
                  {'★'.repeat(review.rating)}
                </div>
              </div>

              <div className="review-course-badge">
                <span>Курс: <strong>{review.course}</strong></span>
                <span className="review-lecturer">({review.lecturerName})</span>
              </div>

              <p className="review-text">«{review.text}»</p>

              <div className="review-date">{review.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
