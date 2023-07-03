import { useState } from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import styles from "./styles.module.scss";
import { step1 } from "../../../data/step1/Step1";
import { Link, useNavigate } from "react-router-dom";
import paths from "../../../routing/Paths";
import i18n from "../../../common/i18n/i18n";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addUserFormData } from "../../../store/slices/userFormsSlice";

type FormData = {
  company_sectors: string[];
  company_scale: string;
  business_units: string[];
  innovation_priorities: string[];
};

type CurrentUser = {
  user_id: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
};

const Step1Form: React.FC = () => {
  const { handleSubmit, control, formState } = useForm<FormData>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser: CurrentUser | null = useAppSelector(
    (store) => store.currentUser.currentUser
  );
  const onSubmit = (data: FormData) => {
    const dataWide = {
      currentUserId: currentUser ? currentUser.user_id : null,
      prioritization: data.innovation_priorities,
      scale: data.company_scale,
      sector: data.company_sectors,
      unit: data.business_units,
      innovation_goals: 0,
      innovation_state: 0,
      success_definition: "",
    };
    dispatch(addUserFormData(dataWide));
    navigate(paths.STEP_1_OUTCOME);
  };

  const [questionIndex, setQuestionIndex] = useState(0);

  const handleNextQuestion = async (): Promise<void> => {
    handleSubmit(() => {
      setQuestionIndex((questionIndex + 1) % step1.length);
    })();
  };

  const handlePrevQuestion = () => {
    setQuestionIndex((questionIndex + step1.length - 1) % step1.length);
  };

  return (
    <div>
      <div className={styles["progress-bar-container"]}>
        <div className={styles["filled-bar"]}></div>
        <div
          className={
            questionIndex >= 1 ? styles["filled-bar"] : styles["empty-bar"]
          }
        ></div>
        <div
          className={
            questionIndex >= 2 ? styles["filled-bar"] : styles["empty-bar"]
          }
        ></div>
        <div
          className={
            questionIndex === 3 ? styles["filled-bar"] : styles["empty-bar"]
          }
        ></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step1
          .filter((q) => step1.indexOf(q) === questionIndex)
          .map((q) => (
            <div className={styles["form-question-container"]} key={q.id}>
              <label
                htmlFor={q.short_name}
                className={styles["form-question-title"]}
              >
                {q.question}
              </label>

              <div className={styles["options-container"]}>
                <Controller
                  control={control}
                  name={q.short_name as keyof FormData}
                  rules={{ required: i18n.t("formFieldMissingMessage") }}
                  defaultValue={q.question_type === "multiple" ? [] : ""}
                  render={({ field }) => (
                    <>
                      {q.options.map((o) => (
                        <label
                          key={o}
                          className={
                            field.value?.includes(o)
                              ? styles["check-box-checked"]
                              : styles["check-box-transparent"]
                          }
                        >
                          <input
                            type={
                              q.question_type === "multiple"
                                ? "checkbox"
                                : "radio"
                            }
                            defaultValue={o}
                            checked={field.value?.includes(o)}
                            onChange={(e) => {
                              if (q.question_type === "single") {
                                field.onChange(e.target.value);
                              } else {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                  field.onChange([
                                    ...(field.value || []),
                                    e.target.value,
                                  ]);
                                } else {
                                  Array.isArray(field.value) &&
                                    field.value.filter(
                                      (value: string) =>
                                        value !== e.target.value
                                    );
                                }
                              }
                            }}
                          />
                          <span>{o}</span>
                        </label>
                      ))}
                    </>
                  )}
                />
              </div>
              <div className={styles["buttons-container"]}>
                {questionIndex === 0 && <Link to={paths.HOME}>Anasayfa</Link>}
                {questionIndex !== 0 && (
                  <button
                    onClick={handlePrevQuestion}
                    className={styles["prev-button"]}
                  >
                    Geri
                  </button>
                )}
                {formState.errors &&
                  formState.errors[
                    q.short_name as keyof FieldErrors<FormData>
                  ] && (
                    <div className={styles["error-container"]}>
                      <p>
                        {
                          formState.errors[
                            q.short_name as keyof FieldErrors<FormData>
                          ]?.message
                        }
                      </p>
                    </div>
                  )}
                {questionIndex < step1.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className={styles["next-button"]}
                  >
                    İleri
                  </button>
                ) : (
                  <button type="submit" className={styles["submit-button"]}>
                    Tamamla
                  </button>
                )}
              </div>
            </div>
          ))}
      </form>
    </div>
  );
};

export default Step1Form;
