import { Link, useNavigate } from "react-router-dom";
import i18n from "../../../common/i18n/i18n";
import styles from "./styles.module.scss";
import paths from "../../../routing/Paths";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCurrentUser } from "../../../store/slices/currentUserSlice";
import { addUser } from "../../../store/slices/usersSlice";

type FormValues = {
  fname: string;
  lname: string;
  email: string;
};
const Step2Outcome = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentUser = useAppSelector((store) => store.currentUser.currentUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const dataWide = {
      user_id: currentUser.user_id,
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      role: currentUser.role,
    };
    dispatch(addCurrentUser(dataWide));
    dispatch(addUser(dataWide));
    reset();
    navigate(paths.STEP_1_OUTRO);
  };
  return (
    <div className={styles["step-2-outro-container"]}>
      <div className={styles["step-2-roadmap-container"]}>
        <img
          src="/step-2/step-2-outcome-roadmap.jpg"
          alt={i18n.t("step2OutcomeImageAltText")}
          className={styles["step-2-outro-image"]}
        />
        <a
          href="https://www.workinlot.com/blog/category/vaka-calismasi"
          target="_blank"
          className={styles["case-studies-link"]}
        >
          {i18n.t("step2CaseStudiesNavText")}
        </a>
        <table className={styles["step-2-table"]}>
          <thead>
            <tr>
              <th>Vade</th>
              <th>Tavsiye</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kısa</td>
              <td>
                İnovasyon hedeflerinizi iç ve dış paydaşlarla birlikte
                belirleyin.
              </td>
            </tr>
            <tr>
              <td>Orta</td>
              <td>İnovasyon projelerinizi hayata geçirmeye başlayın.</td>
            </tr>
            <tr>
              <td>Uzun</td>
              <td>
                Paydaşlarınızdan gelen geri bildirimlere istinaden inovasyon
                hedeflerinizi ve planlarınızı şekillendirin.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles["step-2-outro-text-container"]}>
        <h1 className={styles["step-1-intro-title"]}>
          {i18n.t("step2OutcomeText")}
        </h1>
        <p className="intro-text">{i18n.t("step2CTAText")}</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <div className={styles["input-container"]}>
            <label>İsim</label>
            <input
              {...register("fname", { required: true })}
              type="text"
              placeholder={i18n.t("step2OutcomeFirstNamelInputPlaceholder")}
            />
            {errors.fname && (
              <span className={styles["error-field"]}>Bu alan zorunludur.</span>
            )}
          </div>
          <div className={styles["input-container"]}>
            <label>Soyisim</label>
            <input
              {...register("lname", { required: true })}
              type="text"
              placeholder={i18n.t("step2OutcomeLastNamelInputPlaceholder")}
            />
            {errors.lname && (
              <span className={styles["error-field"]}>Bu alan zorunludur.</span>
            )}
          </div>
          <div className={styles["input-container"]}>
            <label>E-posta</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder={i18n.t("step2OutcomeEmailInputPlaceholder")}
            />
            {errors.email && (
              <span className={styles["error-field"]}>Bu alan zorunludur.</span>
            )}
          </div>
          <button type="submit" className={styles["form-button"]}>
            {i18n.t("step2CTAButtonText")}
          </button>
        </form>
        <Link
          to={paths.STEP_1_OUTRO}
          className={styles["step-2-exit-nav-text"]}
        >
          {i18n.t("step2ExitButtonText")}
        </Link>
      </div>
    </div>
  );
};

export default Step2Outcome;
