import { skills } from "@/data/skills";
import styles from "./SkillGroups.module.css";

export default function SkillGroups() {
  return (
    <dl className={styles.groups}>
      {skills.map((g) => (
        <div key={g.title} className={styles.group}>
          <dt>{g.title}</dt>
          <dd>
            <ul>
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
