import { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { Button } from "./Button.jsx";
import "./Modal.css";

export function Modal({ titleId, onClose, children }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.documentElement.style.overflow;

    // showModal keeps keyboard focus inside and makes the background inert.
    dialog.showModal();
    closeButtonRef.current.focus();
    document.documentElement.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      aria-modal="true"
      onCancel={(event) => {
        // Escape must also update React state, so the portal unmounts.
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;

        // Wrap explicitly: some browsers otherwise focus the browser chrome.
        const controls = [...event.currentTarget.querySelectorAll(
          'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        )].filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal__panel">
        <div className="modal__toolbar">
          <Button ref={closeButtonRef} onClick={onClose}>
            Закрыть
          </Button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root"),
  );
}
