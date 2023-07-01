import styles from "./styles.module.scss";
import Step2FormComp from "../../../components/step-2/form/Step2FormComp";

const Step2Form = () => {
  return (
    <div className={styles["step2-container"]}>
      <Step2FormComp />
    </div>
  );
};

export default Step2Form;
