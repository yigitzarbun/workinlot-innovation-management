import i18n from "../../../common/i18n/i18n";

import styles from "./styles.module.scss";

const Step1Outro = () => {
  return (
    <div className={styles["step1-outro-container"]}>
      <img
        src="/step-1/step-1-outro.png"
        alt={i18n.t("step1OutroImageAltTextt")}
        className={styles["step1-outro-image"]}
      />
      <div className={styles["step1-outro-text-container"]}>
        <h1 className="intro-title">{i18n.t("step1OutroTitle")}</h1>
        <p className="intro-text">{i18n.t("step1OutroText1")}</p>
        <p className="intro-text">{i18n.t("step1OutroText2")}</p>
      </div>
    </div>
  );
};

export default Step1Outro;
