import { Link } from "react-router-dom";

import i18n from "../../../common/i18n/i18n";

import styles from "./styles.module.scss";

import paths from "../../../routing/Paths";
import { useAppDispatch } from "../../../store/hooks";
import { addUser } from "../../../store/slices/usersSlice";
import { addCurrentUser } from "../../../store/slices/currentUserSlice";

const Step1Intro = () => {
  const dispatch = useAppDispatch();
  const handleAddNewUser = () => {
    const anonymousUser = {
      user_id: Date.now(),
      fname: "",
      lname: "",
      email: "",
      password: "",
      role: "user",
    };
    dispatch(addUser(anonymousUser));
    dispatch(addCurrentUser(anonymousUser));
  };
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
          <button onClick={handleAddNewUser} className="intro-button">
            {i18n.t("step1IntroButtonText")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Step1Intro;
