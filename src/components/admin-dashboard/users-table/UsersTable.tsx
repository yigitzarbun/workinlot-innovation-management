import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { UserForm } from "../../../store/slices/userFormsSlice";
import styles from "./styles.module.scss";
import Paths from "../../../routing/Paths";

const UsersTable = () => {
  const userFormData = useAppSelector(
    (store) => store.userFormData.userFormData
  );
  const users = useAppSelector((store) => store.users.users);

  const getUserAnswers = (user_id: number, question: keyof UserForm) => {
    const answers = userFormData.find((ufd) => ufd.currentUserId === user_id);
    if (answers) {
      return answers[question];
    }
    return null;
  };
  console.log(userFormData);
  return (
    <div>
      <table className={styles["table-container"]}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Sectors</th>
            <th>Scale</th>
            <th>Unit</th>
            <th>Priorities</th>
            <th>Goals</th>
            <th>State</th>
            <th>Success</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.role !== "admin")
            .map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{`${user.fname} ${user.lname}`} </td>
                <td>{user.email}</td>
                <td>
                  {getUserAnswers(user.user_id, "sector") ? "Answered" : "-"}
                </td>
                <td>
                  {getUserAnswers(user.user_id, "scale") ? "Answered" : "-"}
                </td>
                <td>
                  {getUserAnswers(user.user_id, "unit") ? "Answered" : "-"}
                </td>
                <td>
                  {getUserAnswers(user.user_id, "prioritization")
                    ? "Answered"
                    : "-"}
                </td>
                <td>
                  {getUserAnswers(user.user_id, "innovation_goals")
                    ? "Answered"
                    : "-"}
                </td>
                <td>
                  {getUserAnswers(user.user_id, "innovation_state")
                    ? "Answered"
                    : "-"}
                </td>
                <td>
                  {getUserAnswers(user.user_id, "success_definition")
                    ? "Answered"
                    : "-"}
                </td>
                <td>
                  {user.fname &&
                    user.lname &&
                    user.email &&
                    getUserAnswers(user.user_id, "sector") &&
                    getUserAnswers(user.user_id, "scale") &&
                    getUserAnswers(user.user_id, "unit") &&
                    getUserAnswers(user.user_id, "prioritization") &&
                    getUserAnswers(user.user_id, "innovation_goals") &&
                    getUserAnswers(user.user_id, "innovation_state") &&
                    getUserAnswers(user.user_id, "success_definition") && (
                      <Link
                        className={styles["view-button"]}
                        to={Paths.DETAILED_FORM_DATA}
                        state={{
                          user_id: user.user_id,
                          fname: user.fname,
                          lname: user.lname,
                          email: user.email,
                          sector: getUserAnswers(user.user_id, "sector"),
                          scale: getUserAnswers(user.user_id, "scale"),
                          unit: getUserAnswers(user.user_id, "unit"),
                          prioritization: getUserAnswers(
                            user.user_id,
                            "prioritization"
                          ),
                          innovation_goals: getUserAnswers(
                            user.user_id,
                            "innovation_goals"
                          ),
                          innovation_state: getUserAnswers(
                            user.user_id,
                            "innovation_state"
                          ),
                          success_definition: getUserAnswers(
                            user.user_id,
                            "success_definition"
                          ),
                        }}
                      >
                        View
                      </Link>
                    )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
