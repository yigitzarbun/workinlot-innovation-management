import { Link } from "react-router-dom";

import paths from "../../routing/Paths";
import i18n from "../../common/i18n/i18n";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles["header-container"]}>
      <Link to={paths.HOME}>
        <img
          src="/logo/wnl-dark-logo.png"
          alt={i18n.t("logoAltText")}
          className={styles.logo}
        />
      </Link>
      <div className={styles["login-signup-container"]}>
        <Link to={paths.LOGIN} className={styles["login-button"]}>
          {i18n.t("headerLoginButtonText")}
        </Link>
        <Link to={paths.SIGNUP} className={styles["signup-button"]}>
          {i18n.t("headerSignupButtonText")}
        </Link>
      </div>
    </div>
  );
};

export default Header;
