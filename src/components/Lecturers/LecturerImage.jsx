import React, { useState } from 'react';

export default function LecturerImage({
  photo,
  cloudPhoto,
  alt,
  imageSourceMode = 'cloud',
  className = ''
}) {
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Determine which URL to prioritize based on the active mode
  const initialSrc = imageSourceMode === 'cloud' && !loadError ? cloudPhoto : photo;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  const handleError = () => {
    // If cloud URL failed, fallback to local bundled photo
    if (currentSrc !== photo) {
      setCurrentSrc(photo);
      setLoadError(true);
    }
  };

  return (
    <div className={`lecturer-image-wrapper ${className}`}>
      {loading && <div className="image-skeleton" />}
      <img
        src={currentSrc}
        alt={alt}
        className={`lecturer-img ${loading ? 'img-hidden' : 'img-visible'}`}
        onLoad={() => setLoading(false)}
        onError={handleError}
        loading="lazy"
      />
      <div className="source-tag" title={loadError ? 'Использован локальный резерв' : (imageSourceMode === 'cloud' ? 'Загружено из Yandex Cloud' : 'Локальное хранилище')}>
        {imageSourceMode === 'cloud' && !loadError ? '☁️ Yandex Cloud' : '💻 Local'}
      </div>
    </div>
  );
}
