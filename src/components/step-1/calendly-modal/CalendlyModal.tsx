import { useEffect } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import i18n from "../../../common/i18n/i18n";

interface CalendlyModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const CalendlyModal = ({ showModal, closeModal }: CalendlyModalProps) => {
  useEffect(() => {
    Modal.setAppElement("#root");

    if (showModal) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showModal]);

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Calendly Modal"
        className={styles["modal-container"]}
      >
        <img
          onClick={closeModal}
          src="/common/close.png"
          alt={i18n.t("calendlyModalCloseIconAltText")}
          className={styles["close-icon"]}
        />
        <iframe
          src="https://calendly.com/workinlot"
          title="Calendly Scheduling"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </Modal>
    </>
  );
};

export default CalendlyModal;
