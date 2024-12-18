import PostService from "@/services/PostService";
import profileStyles from "../../styles/Profile.module.css";
import { Achievement, Post, User } from "../../types/index";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
  user: User;
};

const Profile: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();

  const [numPosts, setNumPosts] = useState<number>(0);
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [latestAchievement, setLatestAchievement] =
    useState<Achievement | null>(user.achievements?.[0] || null);

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
          <h3 className={profileStyles.title}>{t("profile.title")}</h3>
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
            <p className={profileStyles.numPosts}>
              {t("profile.AantalPosts")} {numPosts}
            </p>
            <p className={profileStyles.prestatie}>
              {t("profile.LaatstePrestatie")}{" "}
              {user.achievements && user.achievements.length > 0
                ? user.achievements[0].title
                : t("profile.NoAchievementsYet")}
            </p>

            <p className={profileStyles.startDatum}>
              {t("profile.startDate")} User.StartDate?
            </p>
          </div>
          <div className={profileStyles.boulderSection}>
            <p className={profileStyles.lastBoulder}>
              {t("profile.LastBoulder")}
            </p>
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
              <p>{t("profile.NoBouldersAvailable")}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
