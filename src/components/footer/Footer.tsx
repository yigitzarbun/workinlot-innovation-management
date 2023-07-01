import { useState, ChangeEvent } from "react";
import axios from "axios";

import styles from "./styles.module.scss";
import i18n from "../../common/i18n/i18n";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSubscribe = () => {
    try {
      axios
        .post(
          "MAILCHIMP_API_URL",
          {
            email_address: email,
            status: "subscribed",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "MAILCHIMP_API_KEY",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setEmail("");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles["footer-container"]}>
      <img
        src="/logo/wnl-white-logo.png"
        alt={i18n.t("logoAltText")}
        className={styles.logo}
      />
      <div className={styles["newsletter-container"]}>
        <input
          type="email"
          className={styles["newsletter-input"]}
          placeholder={i18n.t("footerNewsletterInputPlaceholder")}
          onChange={handleEmailChange}
        />
        <button
          className={styles["newsletter-button"]}
          onClick={handleSubscribe}
        >
          {i18n.t("footerNewsletterButtonText")}
        </button>
      </div>
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
