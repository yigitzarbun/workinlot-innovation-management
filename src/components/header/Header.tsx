import { Link, useNavigate } from "react-router-dom";

import paths from "../../routing/Paths";
import i18n from "../../common/i18n/i18n";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutCurrentUser } from "../../store/slices/currentUserSlice";

const Header = () => {
  const currentUser = useAppSelector((store) => store.currentUser.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutCurrentUser());
    navigate(paths.HOME);
  };
  return (
    <div className={styles["header-container"]}>
      <Link to={paths.HOME}>
        <img
          src="/logo/wnl-dark-logo.png"
          alt={i18n.t("logoAltText")}
          className={styles.logo}
        />
      </Link>
      {currentUser ? (
        <div className={styles["profile-container"]}>
          <div>
            {currentUser &&
              currentUser.fname &&
              `Merhaba, ${currentUser.fname}`}
          </div>
          {currentUser.role === "admin" && (
            <Link
              to={paths.ADMIN_DASHBOARD}
              className={styles["dashboard-link"]}
            >
              Dashboard
            </Link>
          )}
          <button className={styles["logout-button"]} onClick={handleLogout}>
            Çıkış
          </button>
        </div>
      ) : (
        <div className={styles["login-signup-container"]}>
          <Link to={paths.LOGIN} className={styles["login-button"]}>
            {i18n.t("headerLoginButtonText")}
          </Link>
          <Link to={paths.SIGNUP} className={styles["signup-button"]}>
            {i18n.t("headerSignupButtonText")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
