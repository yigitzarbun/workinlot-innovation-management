import { useForm, Controller, FieldErrors } from "react-hook-form";
import { useState } from "react";
import paths from "../../../routing/Paths";
import i18n from "../../../common/i18n/i18n";
import { step2 } from "../../../data/step2/Step2";
import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addUserFormData } from "../../../store/slices/userFormsSlice";
import { UserForm } from "../../../store/slices/userFormsSlice";

type FormData = {
  innovation_goals: string[];
  innovation_state: string[];
  success_definition: string[];
  ranking: (string | number)[];
};

const Step2FormComp: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((store) => store.currentUser.currentUser);
  const userFormData = useAppSelector(
    (store) => store.userFormData.userFormData
  );
  const currentUserExistingFormData = userFormData.find(
    (formData) => formData.currentUserId === currentUser?.user_id
  );
  const { handleSubmit, control, formState } = useForm<FormData>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const onSubmit = () => {
    const dataWide: UserForm = {
      currentUserId: currentUser?.user_id || null,
      prioritization: currentUserExistingFormData?.prioritization || [],
      scale: currentUserExistingFormData?.scale || "",
      sector: currentUserExistingFormData?.sector || [],
      unit: currentUserExistingFormData?.unit || [],
      innovation_goals: currentUserExistingFormData
        ? currentUserExistingFormData.innovation_goals
        : [],
      innovation_state: currentUserExistingFormData
        ? currentUserExistingFormData.innovation_state
        : [],
      success_definition: currentUserExistingFormData
        ? currentUserExistingFormData.success_definition
        : [],
    };

    dispatch(addUserFormData(dataWide));
    navigate(paths.STEP_2_OUTCOME);
  };

  const [questionIndex, setQuestionIndex] = useState(0);
  const handleNextQuestion = async (): Promise<void> => {
    handleSubmit(() => {
      setQuestionIndex((questionIndex + 1) % step2.length);
    })();
  };

  const handlePrevQuestion = () => {
    setQuestionIndex((questionIndex + step2.length - 1) % step2.length);
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
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step2
          .filter((q) => questionIndex === step2.indexOf(q))
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
                  defaultValue={Array(q.options.length).fill(0)}
                  render={() => (
                    <>
                      {q.question_type === "ranking" && (
                        <div className={styles["ranking-container"]}>
                          <Controller
                            control={control}
                            name={q.short_name as keyof FormData}
                            render={({ field }) => {
                              const selectedScores = field.value.map(
                                (value: string | number) => Number(value)
                              );

                              const handleScoreChange = (
                                index: number,
                                score: number
                              ) => {
                                const updatedScores = [...selectedScores];
                                updatedScores[index] = score;

                                field.onChange(updatedScores);
                              };

                              const isScoreSelected = (
                                value: string | number
                              ): boolean => {
                                const selectedScores = field.value.map(
                                  (value: string | number) => String(value)
                                );
                                return selectedScores.includes(String(value));
                              };

                              const sortedOptions = q.options
                                .slice()
                                .sort((a, b) => {
                                  const scoreA =
                                    selectedScores[q.options.indexOf(a)];
                                  const scoreB =
                                    selectedScores[q.options.indexOf(b)];
                                  return Number(scoreA) - Number(scoreB);
                                });

                              return (
                                <>
                                  {sortedOptions.map((o) => (
                                    <div
                                      key={o} // Use statement as the unique key
                                      className={
                                        styles["ranking-option-container"]
                                      }
                                    >
                                      <span className={styles["option-label"]}>
                                        {o}
                                      </span>
                                      <select
                                        className={styles["ranking-select"]}
                                        value={
                                          selectedScores[
                                            q.options.indexOf(o)
                                          ] || ""
                                        }
                                        onChange={(e) => {
                                          const selectedScore = parseInt(
                                            e.target.value,
                                            10
                                          ); // Parse the string value to an integer

                                          handleScoreChange(
                                            q.options.indexOf(o),
                                            selectedScore
                                          );

                                          handleScoreChange(
                                            q.options.indexOf(o),
                                            selectedScore
                                          );
                                        }}
                                      >
                                        <option value="">Sıra seç</option>
                                        {Array.from(
                                          Array(q.options.length),
                                          (_, i) => i + 1
                                        ).map((value) => (
                                          <option
                                            key={value}
                                            value={value}
                                            disabled={isScoreSelected(value)}
                                          >
                                            {value}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  ))}
                                </>
                              );
                            }}
                          />
                        </div>
                      )}
                      {q.question_type === "likert" && (
                        <div className={styles["likert-container"]}>
                          <p className={styles["likert-description"]}>
                            1 = Kesinlikle yanlış, 5 = Kesinlikle doğru
                          </p>
                          <Controller
                            control={control}
                            name={q.short_name as keyof FormData}
                            defaultValue={[]}
                            render={({ field }) => (
                              <>
                                {q.options.map((option, index) => (
                                  <div
                                    key={index}
                                    className={
                                      styles["likert-option-container"]
                                    }
                                  >
                                    <span
                                      className={styles["likert-option-label"]}
                                    >
                                      {option}
                                    </span>
                                    {[1, 2, 3, 4, 5].map((score) => {
                                      const checked =
                                        field.value[index] === score;
                                      return (
                                        <label
                                          key={score}
                                          className={styles["likert-option"]}
                                        >
                                          <input
                                            type="radio"
                                            value={score}
                                            checked={checked}
                                            onChange={() => {
                                              const updatedValue = [
                                                ...field.value,
                                              ];
                                              updatedValue[index] = score;
                                              field.onChange(updatedValue);
                                            }}
                                          />
                                          {score}
                                        </label>
                                      );
                                    })}
                                  </div>
                                ))}
                              </>
                            )}
                          />
                        </div>
                      )}

                      {q.question_type === "multiple" && (
                        <div className={styles["multiple-container"]}>
                          <Controller
                            control={control}
                            name={q.short_name as keyof FormData}
                            render={({ field }) => (
                              <>
                                {q.options.map((o) => (
                                  <label
                                    key={o}
                                    className={styles["multiple-label"]}
                                  >
                                    <input
                                      type="checkbox"
                                      value={o}
                                      checked={field.value?.includes(o)}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        if (isChecked) {
                                          field.onChange([
                                            ...(field.value || []),
                                            e.target.value,
                                          ]);
                                        } else {
                                          field.onChange(
                                            (field.value || []).filter(
                                              (value: string | number) =>
                                                value !== e.target.value
                                            )
                                          );
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
                      )}
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
                {questionIndex < step2.length - 1 ? (
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

export default Step2FormComp;
