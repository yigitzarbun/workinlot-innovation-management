import styles from "./styles.module.scss";
import i18n from "../../common/i18n/i18n";

const Footer = () => {
  return (
    <div className={styles["footer-container"]}>
      <img
        src="/logo/wnl-white-logo.png"
        alt={i18n.t("logoAltText")}
        className={styles.logo}
      />
      <div className={styles["footer-social-container"]}>
        <a href="https://www.linkedin.com/company/workinlot/" target="_blank">
          <img
            src="/social/linkedin.png"
            alt={i18n.t("footerLinkedinAltText")}
            className={styles["social-icon"]}
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UC_ovgN3iby3Hpmh_wRpPcvA"
          target="_blank"
        >
          <img
            src="/social/youtube.png"
            alt={i18n.t("footerYoutubeAltText")}
            className={styles["social-icon"]}
          />
        </a>
        <a href="https://twitter.com/workinlot" target="_blank">
          <img
            src="/social/twitter.png"
            alt={i18n.t("footerTwitterAltText")}
            className={styles["social-icon"]}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
