import styles from "./styles.module.scss";
import i18n from "../../../common/i18n/i18n";
import { step2 } from "../../../data/step2/Step2";
interface UserFormDataProps {
  user_id: number;
  fname: string | null;
  lname: string | null;
  email: string | null;
  sector: string | string[];
  scale: string;
  unit: string | string[];
  prioritization: string | string[];
  innovation_goals: string | string[];
  innovation_state: string | string[];
  success_definition: string | string[];
}

const UserFormData = ({
  user_id,
  fname,
  lname,
  email,
  sector,
  scale,
  unit,
  prioritization,
  innovation_goals,
  innovation_state,
  success_definition,
}: UserFormDataProps) => {
  const s2q1Answers = [];
  for (let i = 0; i < step2[0]["options"].length; i++) {
    const answer = {
      statement: step2[0]["options"][i],
      ranking: innovation_goals[i],
    };
    s2q1Answers.push(answer);
  }
  const s2q2Answers = [];
  for (let i = 0; i < step2[1]["options"].length; i++) {
    const answer = {
      statement: step2[1]["options"][i],
      score: innovation_state[i],
    };
    s2q2Answers.push(answer);
  }
  return (
    <div className={styles["user-form-data-container"]}>
      <div className={styles["user-info-container"]}>
        <h1 className={styles["user-info-title"]}>User Info</h1>
        <div className={styles["user-info-sub-container"]}>
          <h2 className={styles["user-info-sub-container-title"]}>User ID:</h2>
          <p>{user_id}</p>
        </div>
        <div className={styles["user-info-sub-container"]}>
          <h2 className={styles["user-info-sub-container-title"]}>
            Full Name:
          </h2>
          <p>{`${fname} ${lname}`}</p>
        </div>
        <div className={styles["user-info-sub-container"]}>
          <h2 className={styles["user-info-sub-container-title"]}>Email:</h2>
          <p>{email}</p>
        </div>
      </div>
      <div className={styles["step-1-answers-container"]}>
        <h1 className={styles["step-1-info-title"]}>Step1 Answers</h1>
        <div className={styles["step-1-answers-sub-container"]}>
          <h2 className={styles["step-1-sub-container-title"]}>
            {"-" + i18n.t("s1q1")}
          </h2>
          {Array.isArray(sector) ? (
            sector.map((s) => <p key={s}> {s}</p>)
          ) : (
            <p>{sector}</p>
          )}
          <p>{sector}</p>
        </div>
        <div className={styles["step-1-answers-sub-container"]}>
          <h2 className={styles["step-1-sub-container-title"]}>
            {"-" + i18n.t("s1q2")}
          </h2>
          <p>{scale}</p>
        </div>
        <div className={styles["step-1-answers-sub-container"]}>
          <h2 className={styles["step-1-sub-container-title"]}>
            {"-" + i18n.t("s1q3")}
          </h2>
          {Array.isArray(unit) ? (
            unit.map((u) => <p key={u}>{u}</p>)
          ) : (
            <p>{unit}</p>
          )}
        </div>
        <div className={styles["step-1-answers-sub-container"]}>
          <h2 className={styles["step-1-sub-container-title"]}>
            {"-" + i18n.t("s1q4")}
          </h2>
          {Array.isArray(prioritization) ? (
            prioritization.map((p) => <p key={p}>{p}</p>)
          ) : (
            <p>{prioritization}</p>
          )}
        </div>
      </div>
      <div className={styles["step-2-answers-container"]}>
        <h1 className={styles["step-2-info-title"]}>Step2 Answers</h1>
        <div className={styles["step-2-answers-sub-container"]}>
          <h2 className={styles["step-2-sub-container-title"]}>
            {"- " + i18n.t("s2q1")}
          </h2>
          {s2q1Answers
            .sort(function (a, b) {
              return Number(a.ranking) - Number(b.ranking);
            })
            .map((a) => (
              <div
                key={a.statement}
                className={styles["step-2-statement-score-container"]}
              >
                <p>{a.statement}</p>
                <p className={styles["score"]}>{a.ranking}</p>
              </div>
            ))}
        </div>
        <div className={styles["step-2-answers-sub-container"]}>
          <h2 className={styles["step-2-sub-container-title"]}>
            {"- " + i18n.t("s2q2")}
          </h2>
          <p>(1 = Kesinlikle Yanlış, 5 = Kesinlikle Doğru)</p>
          {s2q2Answers.map((a) => (
            <div
              key={a.statement}
              className={styles["step-2-statement-score-container"]}
            >
              <p>{a.statement}</p>
              <p className={styles["score"]}>{a.score}</p>
            </div>
          ))}
        </div>
        <div className={styles["step-2-answers-sub-container"]}>
          <h2 className={styles["step-2-sub-container-title"]}>
            {"- " + i18n.t("s2q3")}
          </h2>
          {Array.isArray(success_definition) ? (
            success_definition.map((sd) => <p key={sd}>{sd}</p>)
          ) : (
            <p>{success_definition}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFormData;
