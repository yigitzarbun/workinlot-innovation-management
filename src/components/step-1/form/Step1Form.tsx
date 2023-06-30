import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./styles.module.scss";
import { step1 } from "../../../data/Step1";

type FormData = {
  company_sectors: string[];
  company_scale: string;
  company_units: string[];
  innovation_titles: string[];
};

const Step1Form: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const [questionIndex, setQuestionIndex] = useState(0);
  const handleNextQuestion = () => {
    setQuestionIndex((questionIndex + 1) % step1.length);
  };
  const handlePrevQuestion = () => {
    setQuestionIndex((questionIndex + step1.length - 1) % step1.length);
  };
  return (
    <div>
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
              <Controller
                control={control}
                name={q.short_name as keyof FormData}
                render={({ field }) => {
                  const selectedValues = field.value as string[]; // Explicitly define the type
                  const selectedArray = Array.isArray(selectedValues)
                    ? selectedValues
                    : [selectedValues];
                  return (
                    <div className={styles["options-container"]}>
                      {q.options.map((o) => (
                        <label
                          key={o}
                          className={
                            selectedArray.includes(o)
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
                            value={o}
                            checked={selectedArray.includes(o)}
                            onChange={(e) => {
                              if (q.question_type === "single") {
                                field.onChange(e.target.value);
                              } else {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                  field.onChange([...selectedArray, o]);
                                } else {
                                  field.onChange(
                                    selectedArray.filter(
                                      (value: string) => value !== o
                                    )
                                  );
                                }
                              }
                            }}
                          />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                  );
                }}
              />
              <div className={styles["buttons-container"]}>
                {questionIndex !== 0 && (
                  <button
                    onClick={handlePrevQuestion}
                    className={styles["prev-button"]}
                  >
                    Geri
                  </button>
                )}

                {questionIndex < step1.length - 1 ? (
                  <button
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
