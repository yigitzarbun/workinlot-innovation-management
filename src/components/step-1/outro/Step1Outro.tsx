import { useState } from "react";
import i18n from "../../../common/i18n/i18n";
import CalendlyModal from "../calendly-modal/CalendlyModal";
import styles from "./styles.module.scss";

declare global {
  interface Window {
    Calendly: any;
  }
}

const Step1Outro = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles["step1-outro-container"]}>
      <img
        src="/step-1/step-1-outro.png"
        alt={i18n.t("step1OutroImageAltTextt")}
        className={styles["step1-outro-image"]}
      />
      <div className={styles["step1-outro-text-and-buttons-container"]}>
        <div className={styles["step1-outro-text-container"]}>
          <h1 className="intro-title">{i18n.t("step1OutroTitle")}</h1>
          <p className="intro-text">{i18n.t("step1OutroText1")}</p>
          <p className="intro-text">{i18n.t("step1OutroText2")}</p>
        </div>
        <button onClick={openModal} className="calendly-button">
          {i18n.t("openCalendlyModalButtonText")}
        </button>
      </div>
      <CalendlyModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default Step1Outro;
