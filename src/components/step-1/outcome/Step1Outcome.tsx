import { Link } from "react-router-dom";
import i18n from "../../../common/i18n/i18n";
import styles from "./styles.module.scss";
import paths from "../../../routing/Paths";

const Step1Outcome = () => {
  return (
    <div className={styles["step1-outro-container"]}>
      <img
        src="/step-1/step-1-outcome.png"
        alt={i18n.t("step1OutcomeImageAltText")}
        className={styles["step1-outro-container"]}
      />
      <div className={styles["step1-outro-text-container"]}>
        <h1 className={styles["step-1-intro-title"]}>
          {i18n.t("step1OutcomeText")}
        </h1>
        <div className={styles["step-1-outcome-results-container"]}>
          <div className={styles["step-1-outcome-results-text-container"]}>
            <p className={styles["step-1-outcome-results-textbox"]}>
              Süreç İnovasyonu
            </p>
          </div>
          <div className={styles["step-1-outcome-results-text-container"]}>
            <p className={styles["step-1-outcome-results-textbox"]}>
              Ürün İnovasyonu
            </p>
          </div>
          <div className={styles["step-1-outcome-results-text-container"]}>
            <p className={styles["step-1-outcome-results-textbox"]}>
              Kurumsal İnovasyon
            </p>
          </div>
        </div>
        <p className="intro-text">{i18n.t("step1CTAText")}</p>
        <div className={styles["step-1-buttons-container"]}>
          <Link to={paths.STEP_1_OUTRO}>
            <button className="cancel-button">
              {i18n.t("step1ExitButtonText")}{" "}
            </button>
          </Link>
          <button className="intro-button">
            {i18n.t("step1CTAButtonText")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Outcome;
