import React, { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Partners from './components/Partners/Partners';
import LecturersSection from './components/Lecturers/LecturersSection';
import Calculator from './components/Calculator/Calculator';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Reviews from './components/Reviews/Reviews';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BookingModal from './components/BookingModal/BookingModal';
import { LECTURERS_DATA } from './data/lecturersData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [imageSourceMode, setImageSourceMode] = useState('cloud'); // 'cloud' | 'local'

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingLecturer, setBookingLecturer] = useState(null);
  const [bookingTariff, setBookingTariff] = useState(null);

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

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      <Header
        activeTab={activeTab}
        onTabChange={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        imageSourceMode={imageSourceMode}
        onToggleImageSource={handleToggleImageSource}
      />

      <main className="main-content">
        {activeTab === 'home' && (
          <>
            <Hero
              onFindLecturer={() => {
                const el = document.getElementById('lecturers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('lecturers');
              }}
              onLearnMore={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('about');
              }}
            />
            <About
              onExploreLecturers={() => {
                const el = document.getElementById('lecturers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('lecturers');
              }}
              onContactUs={() => {
                const el = document.getElementById('contacts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('contacts');
              }}
            />
            <Partners
              onBecomePartner={() => {
                const el = document.getElementById('contacts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('contacts');
              }}
            />
            <LecturersSection
              lecturers={LECTURERS_DATA}
              onBookLecturer={handleOpenBooking}
              imageSourceMode={imageSourceMode}
              onToggleImageSource={handleToggleImageSource}
            />
            <Calculator
              lecturers={LECTURERS_DATA}
              onBookWithCalculation={(lect, customTariff) => handleOpenBooking(lect, customTariff)}
            />
            <HowItWorks
              onActionClick={() => {
                const el = document.getElementById('lecturers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <Reviews />
            <FAQ />
            <Contact />
          </>
        )}

        {activeTab === 'lecturers' && (
          <LecturersSection
            lecturers={LECTURERS_DATA}
            onBookLecturer={handleOpenBooking}
            imageSourceMode={imageSourceMode}
            onToggleImageSource={handleToggleImageSource}
          />
        )}

        {activeTab === 'partners' && (
          <Partners onBecomePartner={() => handleNavigate('contacts')} />
        )}

        {activeTab === 'about' && (
          <About
            onExploreLecturers={() => handleNavigate('lecturers')}
            onContactUs={() => handleNavigate('contacts')}
          />
        )}

        {activeTab === 'calculator' && (
          <Calculator
            lecturers={LECTURERS_DATA}
            onBookWithCalculation={(lect, customTariff) => handleOpenBooking(lect, customTariff)}
          />
        )}

        {activeTab === 'faq' && <FAQ />}

        {activeTab === 'contacts' && <Contact />}
      </main>

      <Footer onNavigate={handleNavigate} />

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
