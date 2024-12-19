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
import useSWR from "swr";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const fetcher = async (key: string, email: string, token: string) => {
    if (key === "user") {
      return UserService.getUserByEmail(email, token);
    } else if (key === "posts") {
      return PostService.getPostsByUserEmail(email, token);
    }
    throw new Error("Invalid key");
  };

  const { data: user, error: userError } = useSWR(
    email && token ? ["user", email, token] : null,
    ([key, email, token]) => fetcher(key, email, token)
  );

  const { data: posts, error: postsError } = useSWR(
    email && token ? ["posts", email, token] : null,
    ([key, email, token]) => fetcher(key, email, token)
  );

  const numPosts = posts?.length || 0;
  const latestPost = posts?.length > 0 ? posts[posts.length - 1] : null;
  const latestAchievement = user?.achievements?.[0] || null;

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      const { email, token } = JSON.parse(userData);
      setEmail(email);
      setToken(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
          <p className={LoginStyles.notLoggedInProfile}>
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
