import { Link } from "react-router-dom";

import paths from "../../routing/Paths";
import i18n from "../../common/i18n/i18n";
import style from "./styles.module.scss";
const Header = () => {
  return (
    <div className={style["header-container"]}>
      <Link to={paths.HOME}>
        <img
          src="/logo/logo.png"
          alt={i18n.t("logoAltText")}
          className={style.logo}
        />
      </Link>
      <div className={style["login-signup-container"]}>
        <Link to={paths.LOGIN} className={style["login-button"]}>
          Login
        </Link>
        <Link to={paths.SIGNUP} className={style["signup-button"]}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Header;
