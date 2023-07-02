import { Link, useNavigate } from "react-router-dom";
import i18n from "../../common/i18n/i18n";
import styles from "./styles.module.scss";
import paths from "../../routing/Paths";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  fname: string;
  lname: string;
  email: string;
  password: string;
};
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
    navigate(paths.HOME);
  };

  return (
    <div className={styles["signup-page-container"]}>
      <h1 className={styles["signup-title"]}>Kayıt Ol</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <div className={styles["input-container"]}>
          <label>İsim</label>
          <input
            {...register("fname", { required: true })}
            type="text"
            placeholder={i18n.t("signupFirstNamelInputPlaceholder")}
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
            placeholder={i18n.t("signupLastNamelInputPlaceholder")}
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
            placeholder={i18n.t("signupEmailInputPlaceholder")}
          />
          {errors.email && (
            <span className={styles["error-field"]}>Bu alan zorunludur.</span>
          )}
        </div>
        <div className={styles["input-container"]}>
          <label>Şifre</label>
          <input
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && (
            <span className={styles["error-field"]}>Bu alan zorunludur.</span>
          )}
        </div>
        <button type="submit" className={styles["form-button"]}>
          {i18n.t("signupButtonText")}
        </button>
      </form>
    </div>
  );
};

export default Register;
