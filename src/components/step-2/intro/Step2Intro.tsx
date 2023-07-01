import { Link } from "react-router-dom";

import i18n from "../../../common/i18n/i18n";

import paths from "../../../routing/Paths";

import styles from "./styles.module.scss";

const Step2Intro = () => {
  return (
    <div className={styles["step2-intro-container"]}>
      <img
        src="/step-2/step-2-intro.png"
        alt={i18n.t("step2IntroImageAltText")}
        className={styles["step2-intro-image"]}
      />
      <div className={styles["step2-intro-text-container"]}>
        <p className="intro-text">{i18n.t("step2IntroText")}</p>
        <Link to={paths.STEP_2_FORM}>
          <button className="intro-button">
            {i18n.t("step2IntroButtonText")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Step2Intro;
