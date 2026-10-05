import React from 'react';
import './Partners.css';

export default function Partners() {
  const partners = [
    {
      id: 'icl',
      title: 'iCL',
      name: 'ICL',
      desc: 'Высокотехнологичная динамично развивающаяся группа компаний, входящая в число крупнейших IT-предприятий России. Предоставляет весь спектр IT-услуг, проектирование, системную интеграцию и разработку программного обеспечения.'
    },
    {
      id: 'tatneft',
      title: 'TATNEFT',
      name: 'Татнефть',
      desc: 'Одна из крупнейших российских нефтяных компаний, международно признанный холдинг. Активно внедряет инновации, корпоративное обучение специалистов и совместные научно-образовательные программы.'
    },
    {
      id: 'vk',
      title: 'VK',
      name: 'VK',
      desc: 'Ведущая российская технологическая корпорация, развивающая экосистему цифровых сервисов, образовательные инициативы для студентов и партнерские программы с ведущими преподавателями.'
    }
  ];

  return (
    <section className="partners-section" id="partners">
      <div className="container partners-container">
        <h2 className="partners-heading">Партнеры</h2>

        <div className="partners-grid-3">
          {partners.map((p) => (
            <div key={p.id} className="partner-item">
              <div className="partner-logo-box">
                <span className={`partner-brand ${p.id}`}>{p.title}</span>
              </div>
              <h3 className="partner-item-name">{p.name}</h3>
              <p className="partner-item-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
