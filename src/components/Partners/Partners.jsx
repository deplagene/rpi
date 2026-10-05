import React from 'react';
import './Partners.css';

export default function Partners() {
  return (
    <div className="figma-frame-wrap" id="partners">
      <span className="frame-tag-label">Партнеры</span>

      <div className="figma-card figma-partners-card">
        <div className="partners-two-cols">
          {/* ICL Partner Column */}
          <div className="partner-column">
            <div className="partner-header-row">
              <a
                href="https://icl.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link-group"
                title="Перейти на сайт ICL"
              >
                <div className="icl-logo-visual">
                  <span className="icl-red-text">iCL</span>
                </div>
                <span className="partner-arrow-icon">↗</span>
              </a>
            </div>

            <p className="partner-text-content">
              ICL — высокотехнологичная, динамично развивающаяся группа компаний, входящая в число крупнейших ИТ-компаний России, предоставляющая весь спектр ИТ-услуг, проектов, решений и продуктов. Компания была основана в 1991 году на базе завода ЭВМ Казанским производственным объединением вычислительных систем (КПО ВС).
            </p>
          </div>

          {/* TATNEFT Partner Column */}
          <div className="partner-column">
            <div className="partner-header-row">
              <a
                href="https://www.tatneft.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link-group"
                title="Перейти на сайт Татнефть"
              >
                <div className="tatneft-logo-visual">
                  <span className="tatneft-flame-icon">🔥</span>
                  <span className="tatneft-green-text">TATNEFT</span>
                </div>
                <span className="partner-arrow-icon">↗</span>
              </a>
            </div>

            <p className="partner-text-content">
              «Татнефть» - одна из крупнейших российских вертикально-интегрированных компаний, в составе которой динамично развиваются нефтегазодобыча, нефтепереработка, нефтегазохимия, сеть АЗС, композитный кластер, электроэнергетика, разработка и производство оборудования для нефтегазовой отрасли и блок сервисных структур.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
