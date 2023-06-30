import Step1Form from "../../components/step-1/form/Step1Form";
import styles from "./styles.module.scss";
const Step1 = () => {
  return (
    <div className={styles["step1-container"]}>
      <Step1Form />
    </div>
  );
};

export default Step1;
