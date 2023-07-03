import { useNavigate } from "react-router-dom";
import i18n from "../../common/i18n/i18n";
import styles from "./styles.module.scss";
import paths from "../../routing/Paths";
import { useForm, SubmitHandler } from "react-hook-form";
import { addCurrentUser } from "../../store/slices/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
type FormValues = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { users } = useAppSelector((store) => store.users);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const currentUser = users.filter((u) => u.email === data.email)[0];
    if (currentUser) {
      const currentUserData = {
        user_id: currentUser.user_id,
        fname: currentUser.fname,
        lname: currentUser.lname,
        email: currentUser.email,
        role: currentUser.role,
      };
      dispatch(addCurrentUser(currentUserData));
      navigate(paths.HOME);
    }
    reset();
  };

  return (
    <div className={styles["login-page-container"]}>
      <h1 className={styles["login-title"]}>Giriş</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <div className={styles["input-container"]}>
          <label>E-posta</label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder={i18n.t("loginEmailInputPlaceholder")}
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
          {i18n.t("loginButtonText")}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
