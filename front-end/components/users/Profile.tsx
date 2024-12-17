import PostService from "@/services/PostService";
import profileStyles from "../../styles/Profile.module.css";
import { Post, User } from "../../types/index";
import { useEffect, useState } from "react";

type Props = {
  user: User;
};

const Profile: React.FC<Props> = ({ user }) => {
  const [numPosts, setNumPosts] = useState<number>(0);
  const [latestPost, setLatestPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user.email) {
          const posts = await PostService.getPostsByUserEmail(user.email);
          setNumPosts(posts.length);
          if (posts.length > 0) {
            setLatestPost(posts[posts.length - 1]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [user]);
  return (
    <>
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
            ></img>
          </div>
        </div>
        <div className={profileStyles.bottom}>
          <div className={profileStyles.PostsAndAchievementAndDate}>
            <p className={profileStyles.numPosts}>Aantal Posts: {numPosts}</p>
            <p className={profileStyles.prestatie}>
              Beste Prestatie: Achievement?
            </p>

            <p className={profileStyles.startDatum}>
              StartDatum: User.StartDate? (of startDate eerste Post)
            </p>
          </div>
          <div className={profileStyles.boulderSection}>
            <p className={profileStyles.lastBoulder}>Laatste boulder:</p>
            {latestPost && latestPost.boulder ? (
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
    </>
  );
};

export default Profile;
