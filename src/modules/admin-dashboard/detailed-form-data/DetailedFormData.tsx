import { useLocation } from "react-router-dom";
import UserFormData from "../../../components/admin-dashboard/detailed-form-data/UserFormData";
import styles from "./styles.module.scss";
const DetailedFormData = () => {
  const location = useLocation();
  const data = {
    user_id: location.state.user_id,
    fname: location.state.fname,
    lname: location.state.lname,
    email: location.state.email,
    sector: location.state.sector,
    scale: location.state.scale,
    unit: location.state.unit,
    prioritization: location.state.prioritization,
    innovation_goals: location.state.innovation_goals,
    innovation_state: location.state.innovation_state,
    success_definition: location.state.success_definition,
  };

  return (
    <div className={styles["detailed-form-data"]}>
      <UserFormData {...data} />
    </div>
  );
};

export default DetailedFormData;
