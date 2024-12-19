import { useEffect, useState } from "react";
import { User, Post, Achievement } from "@/types";
import UserService from "@/services/UserService";
import PostService from "@/services/PostService";
import ProfileComponent from "@/components/users/Profile";
import Header from "@/components/header";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginStyles from "../../styles/Login.module.css";
import ProfileStyles from "../../styles/Profile.module.css";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [numPosts, setNumPosts] = useState<number>(0);
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [latestAchievement, setLatestAchievement] =
    useState<Achievement | null>(null);

  const getUserData = async () => {
    const userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
      try {
        const { email, token } = JSON.parse(userData);
        const fetchedUser = await UserService.getUserByEmail(email, token);

        setUser(fetchedUser);
        setLatestAchievement(fetchedUser?.achievements?.[0] || null);

        const posts = await PostService.getPostsByUserEmail(email, token);
        setNumPosts(posts.length);
        setLatestPost(posts.length > 0 ? posts[posts.length - 1] : null);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Head>
        <title>{t("profile.title")}</title>
        <meta name="description" content="Profile Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={ProfileStyles.mainProfile}>
        {isLoggedIn === null ? (
          <p>{t("general.loading")}</p>
        ) : isLoggedIn && user ? (
          <ProfileComponent
            user={user}
            numPosts={numPosts}
            latestPost={latestPost}
            latestAchievement={latestAchievement}
          />
        ) : (
          <p className={LoginStyles.notLoggedIn}>
            {t("general.login1")}
            <Link href="../login">{t("general.login2")}</Link>{" "}
            {t("general.login3")}
          </p>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default ProfilePage;
