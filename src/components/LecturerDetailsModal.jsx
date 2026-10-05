import { useId } from "react";
import { lecturerPhoto } from "../api/photos.js";
import { getCoursesByLecturerId } from "../data/courses.js";
import { Link } from "../router/Link.jsx";
import { Button } from "./Button.jsx";
import { LecturerMeta } from "./LecturerMeta.jsx";
import { LecturerPortrait } from "./LecturerPortrait.jsx";
import { Modal } from "./Modal.jsx";
import { TariffList } from "./TariffList.jsx";

export function LecturerDetailsModal({ lecturer, onClose }) {
  const titleId = useId();
  const photo = lecturerPhoto(lecturer.id);
  const courses = getCoursesByLecturerId(lecturer.id);

  return (
    <Modal titleId={titleId} onClose={onClose}>
      <div className="page lecturer-details">
        <header className="lecturer-details__hero">
          <LecturerPortrait
            src={photo.src}
            fallbackSrc={photo.fallbackSrc}
            fullName={lecturer.fullName}
            loading="eager"
          />
          <div className="lecturer-details__intro">
            <h2 id={titleId}>{lecturer.fullName}</h2>
            <LecturerMeta
              education={lecturer.education}
              experienceYears={lecturer.experienceYears}
              degree={lecturer.degree}
            />
          </div>
        </header>

        <section className="lecturer-details__section">
          <h3>Дисциплины</h3>
          <ul className="lecturer-details__courses">
            {courses.map((course) => (
              <li key={course.id}>
                <h4>
                  <Link href={`/courses/${course.id}`}>{course.title}</Link>
                </h4>
                <p>{course.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lecturer-details__section">
          <h3>Тарифы</h3>
          <TariffList tariffs={lecturer.tariffs} />
        </section>

        <div className="lecturer-details__actions">
          <Button href={`/contacts?lecturer=${lecturer.id}`} variant="solid">
            Оставить заявку
          </Button>
          <Button href={`/lecturers/${lecturer.id}`}>Открыть профиль</Button>
        </div>
      </div>
    </Modal>
  );
}
