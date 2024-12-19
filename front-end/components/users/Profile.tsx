import { User, Post, Achievement } from "@/types";
import profileStyles from "../../styles/Profile.module.css";

type ProfileProps = {
  user: User;
  numPosts: number;
  latestPost: Post | null;
  latestAchievement: Achievement | null;
};

const ProfileComponent: React.FC<ProfileProps> = ({
  user,
  numPosts,
  latestPost,
  latestAchievement,
}) => {
  return (
    <div className={profileStyles.profilePage}>
      <div className={profileStyles.top}>
        <h3 className={profileStyles.title}>Profile</h3>
        <div className={profileStyles.UsernameAndPfp}>
          <p className={profileStyles.username}>{user.name}</p>
          <img
            src="/pictures/pfp.png"
            alt="Profile Picture"
            width={100}
            height={100}
            className={profileStyles.pfp}
          />
        </div>
      </div>

      <div className={profileStyles.bottom}>
        <div className={profileStyles.PostsAndAchievementAndDate}>
          <p className={profileStyles.numPosts}>Aantal Posts: {numPosts}</p>
          <p className={profileStyles.prestatie}>
            Laatste Prestatie:{" "}
            {latestAchievement?.title || "No achievements yet"}
          </p>
          <p className={profileStyles.startDatum}>
            StartDatum: {`user.startDate`}
          </p>
        </div>

        <div className={profileStyles.boulderSection}>
          <p className={profileStyles.lastBoulder}>Laatste boulder:</p>
          {latestPost?.boulder ? (
            <>
              <p>
                {latestPost.boulder.gym.gymName} - {latestPost.boulder.grade}
              </p>
              <img
                src={latestPost.image.path}
                alt="Laatste Boulder"
                className={profileStyles.boulder}
              />
            </>
          ) : (
            <p>No boulders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
