import UsersTable from "../../../components/admin-dashboard/users-table/UsersTable";
import styles from "./styles.module.scss";

const AdminDashboard = () => {
  return (
    <div className={styles["admin-dashboard"]}>
      <UsersTable />
    </div>
  );
};

export default AdminDashboard;
