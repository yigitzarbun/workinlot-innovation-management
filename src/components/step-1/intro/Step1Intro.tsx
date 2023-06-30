import { Link } from "react-router-dom";

import i18n from "../../../common/i18n/i18n";

import styles from "./styles.module.scss";

import paths from "../../../routing/Paths";

const Step1Intro = () => {
  return (
    <div className={styles["step1-intro-container"]}>
      <img
        src="/step-1/step-1-intro.png"
        alt={i18n.t("step1IntroImageAltText")}
        className={styles["step1-intro-image"]}
      />
      <div className={styles["step1-intro-text-container"]}>
        <h1 className="intro-title">{i18n.t("step1IntroTitle")}</h1>
        <p className="intro-text">{i18n.t("step1IntroText")}</p>
        <Link to={paths.STEP_1}>
          <button className="intro-button">
            {i18n.t("step1IntroButtonText")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Step1Intro;
