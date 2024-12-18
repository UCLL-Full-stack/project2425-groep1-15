import { Achievement, User } from "@/types";
import { useEffect, useState } from "react";
import AchievementService from "@/services/AchievementService";
import AchievementStyles from "../../styles/Achievement.module.css";

type Props = {
  user: User;
};

const AchievementSection: React.FC<Props> = ({ user }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(
    user.achievements || []
  );

  return (
    <>
      <div className={AchievementStyles.section}>
        <p className={AchievementStyles.title}>Achievements:</p>

        {achievements.map((post, index) => (
          <div key={index}>
            <div className={AchievementStyles.achievement}>
              <p className={AchievementStyles.achievementTitle}>{post.title}</p>
              <p className={AchievementStyles.difficulty}>{post.difficulty}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AchievementSection;
