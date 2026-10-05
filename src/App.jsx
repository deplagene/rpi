import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Partners from './components/Partners/Partners';
import LecturersSection from './components/Lecturers/LecturersSection';
import BookingModal from './components/BookingModal/BookingModal';
import { LECTURERS_DATA } from './data/lecturersData';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [imageSourceMode, setImageSourceMode] = useState('cloud'); // 'cloud' | 'local'

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingLecturer, setBookingLecturer] = useState(null);
  const [bookingTariff, setBookingTariff] = useState(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'partners', 'lecturers'];
      const scrollPos = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (lecturer = null, tariff = null) => {
    setBookingLecturer(lecturer || LECTURERS_DATA[0]);
    setBookingTariff(tariff || (lecturer ? lecturer.tariffs[0] : LECTURERS_DATA[0].tariffs[0]));
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleToggleImageSource = () => {
    setImageSourceMode((prev) => (prev === 'cloud' ? 'local' : 'cloud'));
  };

  return (
    <div className="site-wrapper">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        imageSourceMode={imageSourceMode}
        onToggleImageSource={handleToggleImageSource}
      />

      <main className="main-content">
        <Hero onFindLecturer={() => handleNavigate('lecturers')} />
        <About />
        <Partners />
        <LecturersSection
          lecturers={LECTURERS_DATA}
          onBookLecturer={handleOpenBooking}
          imageSourceMode={imageSourceMode}
        />
      </main>

      <footer className="simple-footer">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} Учебная платформа. Все права защищены.</p>
          <div className="footer-links-row">
            <button onClick={() => handleNavigate('home')}>Главная</button>
            <button onClick={() => handleNavigate('about')}>О нас</button>
            <button onClick={() => handleNavigate('partners')}>Партнеры</button>
            <button onClick={() => handleNavigate('lecturers')}>Лекторы</button>
          </div>
        </div>
      </footer>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        lecturers={LECTURERS_DATA}
        initialLecturer={bookingLecturer}
        initialTariff={bookingTariff}
      />
    </div>
  );
}
