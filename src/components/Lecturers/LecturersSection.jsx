import React, { useState, useMemo } from 'react';
import LecturerCard from './LecturerCard';
import LecturerModal from './LecturerModal';
import { CATEGORIES } from '../../data/lecturersData';

export default function LecturersSection({
  lecturers,
  onBookLecturer,
  imageSourceMode,
  onToggleImageSource
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all'); // all, male, female
  const [degreeFilter, setDegreeFilter] = useState('all'); // all, candidate, doctor, none
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // default, exp-desc, price-asc, price-desc

  // Modal states
  const [modalLecturer, setModalLecturer] = useState(null);
  const [modalDisciplineId, setModalDisciplineId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (lecturer, disciplineId) => {
    setModalLecturer(lecturer);
    setModalDisciplineId(disciplineId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredLecturers = useMemo(() => {
    return lecturers.filter((l) => {
      // Gender filter
      if (genderFilter !== 'all' && l.gender !== genderFilter) {
        return false;
      }

      // Degree filter
      if (degreeFilter === 'candidate' && !l.degree.includes('кандидат')) {
        return false;
      }
      if (degreeFilter === 'doctor' && !l.degree.includes('доктор')) {
        return false;
      }
      if (degreeFilter === 'none' && l.degree !== 'нет') {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && l.category !== categoryFilter) {
        return false;
      }

      // Search query (matches name, education, discipline titles, topics)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = l.fullName.toLowerCase().includes(q);
        const matchesEdu = l.education.toLowerCase().includes(q);
        const matchesDegree = l.degree.toLowerCase().includes(q);
        const matchesDisc = l.disciplines.some(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q) ||
            d.topics.some((t) => t.toLowerCase().includes(q))
        );
        if (!matchesName && !matchesEdu && !matchesDegree && !matchesDisc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'exp-desc') {
        return b.experience - a.experience;
      }
      if (sortBy === 'price-asc') {
        return a.tariffs[0].price - b.tariffs[0].price;
      }
      if (sortBy === 'price-desc') {
        return b.tariffs[0].price - a.tariffs[0].price;
      }
      return 0; // default order
    });
  }, [lecturers, genderFilter, degreeFilter, categoryFilter, searchQuery, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' ||
    genderFilter !== 'all' ||
    degreeFilter !== 'all' ||
    categoryFilter !== 'all' ||
    sortBy !== 'default';

  const resetFilters = () => {
    setSearchQuery('');
    setGenderFilter('all');
    setDegreeFilter('all');
    setCategoryFilter('all');
    setSortBy('default');
  };

  return (
    <section className="section lecturers-section" id="lecturers">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Каталог преподавателей</span>
          <h2 className="section-title">Лекторы и лекционные курсы</h2>
          <p className="section-subtitle">
            10 признанных преподавателей, 30 дисциплин и 300 подробных лекционных тем.
            Выберите специалиста и запишитесь на удобный формат занятий.
          </p>
        </div>

        {/* Filters control bar */}
        <div className="filters-card">
          <div className="filters-row-top">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Поиск по лектору, дисциплине, теме (например, Python, ДНК, Алгебра)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Очистить"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sort-box">
              <label htmlFor="sort-select">Сортировка:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="default">По умолчанию</option>
                <option value="exp-desc">По стажу (сначала опытные)</option>
                <option value="price-asc">По стоимости (от недорогих)</option>
                <option value="price-desc">По стоимости (от дорогих)</option>
              </select>
            </div>
          </div>

          <div className="filters-row-pills">
            {/* Gender filters */}
            <div className="filter-group">
              <span className="filter-group-label">Преподаватели:</span>
              <div className="pills-group">
                <button
                  className={`pill-btn ${genderFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setGenderFilter('all')}
                >
                  Все ({lecturers.length})
                </button>
                <button
                  className={`pill-btn ${genderFilter === 'male' ? 'active' : ''}`}
                  onClick={() => setGenderFilter('male')}
                >
                  Мужчины (5)
                </button>
                <button
                  className={`pill-btn ${genderFilter === 'female' ? 'active' : ''}`}
                  onClick={() => setGenderFilter('female')}
                >
                  Женщины (5)
                </button>
              </div>
            </div>

            {/* Degree filters */}
            <div className="filter-group">
              <span className="filter-group-label">Ученая степень:</span>
              <div className="pills-group">
                <button
                  className={`pill-btn ${degreeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setDegreeFilter('all')}
                >
                  Любая
                </button>
                <button
                  className={`pill-btn ${degreeFilter === 'doctor' ? 'active' : ''}`}
                  onClick={() => setDegreeFilter('doctor')}
                >
                  Доктора наук
                </button>
                <button
                  className={`pill-btn ${degreeFilter === 'candidate' ? 'active' : ''}`}
                  onClick={() => setDegreeFilter('candidate')}
                >
                  Кандидаты наук
                </button>
                <button
                  className={`pill-btn ${degreeFilter === 'none' ? 'active' : ''}`}
                  onClick={() => setDegreeFilter('none')}
                >
                  Практики
                </button>
              </div>
            </div>

            {/* Category dropdown */}
            <div className="filter-group">
              <span className="filter-group-label">Направление:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select category-select"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button className="reset-filters-btn" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            )}
          </div>

          <div className="filters-footer-info">
            <span className="results-count">
              Найдено преподавателей: <strong>{filteredLecturers.length}</strong> из {lecturers.length}
            </span>
            <div className="cloud-mode-indicator">
              <span>Загрузка фото: </span>
              <button
                className="cloud-mode-link"
                onClick={onToggleImageSource}
                title="Переключить облачную/локальную загрузку фото"
              >
                {imageSourceMode === 'cloud' ? '☁️ Yandex Cloud (с локальным fallback)' : '💻 Локальные ассеты'}
              </button>
            </div>
          </div>
        </div>

        {/* Lecturer cards grid */}
        {filteredLecturers.length > 0 ? (
          <div className="lecturers-grid">
            {filteredLecturers.map((lecturer) => (
              <LecturerCard
                key={lecturer.id}
                lecturer={lecturer}
                onOpenDetails={handleOpenDetails}
                onBook={onBookLecturer}
                imageSourceMode={imageSourceMode}
              />
            ))}
          </div>
        ) : (
          <div className="no-results-box">
            <span className="no-results-icon">🔎</span>
            <h3>По вашему запросу ничего не найдено</h3>
            <p>Попробуйте изменить параметры поиска или сбросить фильтры.</p>
            <button className="btn btn-primary" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Syllabus Modal */}
      <LecturerModal
        lecturer={modalLecturer}
        initialDisciplineId={modalDisciplineId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBook={onBookLecturer}
        imageSourceMode={imageSourceMode}
      />
    </section>
  );
}
