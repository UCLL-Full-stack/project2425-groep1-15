import profileStyles from "../../styles/Profile.module.css";
import { User } from "../../types/index";

type Props = {
  users: Array<User>;
};

const Profile: React.FC = () => {
  return (
    <>
      <div className={profileStyles.profilePage}>
        <div className={profileStyles.top}>
          <h3 className={profileStyles.title}>Profile</h3>
          <div className={profileStyles.UsernameAndPfp}>
            <p className={profileStyles.username}>User.name</p>
            <img
              src="/pictures/pfp.png"
              alt="Profile Picture"
              width={100}
              height={100}
              className={profileStyles.pfp}
            ></img>
          </div>
        </div>
        <div className={profileStyles.bottom}>
          <div className={profileStyles.PostsAndAchievementAndDate}>
            <p className={profileStyles.numPosts}>
              Aantal Posts: User.NumPosts
            </p>
            <p className={profileStyles.prestatie}>
              Beste Prestatie: Achievement?
            </p>

            <p className={profileStyles.startDatum}>
              StartDatum: User.StartDate? (of startDate eerste Post)
            </p>
          </div>
          <div className={profileStyles.boulderSection}>
            <p className={profileStyles.lastBoulder}>Laatste boulder:</p>
            {/* User.posts[-1].boulder */}
            <img
              src="/pictures/boulder.jpg"
              alt="Laatste Boulder"
              className={profileStyles.boulder}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
