import { useForm, Controller } from "react-hook-form";
import styles from "./styles.module.scss";

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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-question-container"]}>
          <label
            htmlFor="company_sectors"
            className={styles["form-question-title"]}
          >
            Şirketiniz hangi sektör veya sektörlerde faaliyet gösteriyor?
          </label>
          <Controller
            control={control}
            name="company_sectors"
            render={({ field }) => {
              const selectedValues = field.value || [];
              return (
                <div className={styles["options-container"]}>
                  <label
                    className={
                      selectedValues.includes("technology")
                        ? styles["check-box-checked"]
                        : styles["check-box-transparent"]
                    }
                  >
                    <input
                      type="checkbox"
                      value="technology"
                      checked={selectedValues.includes("technology")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...selectedValues, e.target.value]);
                        } else {
                          field.onChange(
                            selectedValues.filter(
                              (value) => value !== e.target.value
                            )
                          );
                        }
                      }}
                    />
                    <span>Technology</span>
                  </label>
                </div>
              );
            }}
          />
          <button>Devam</button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Step1Form;
