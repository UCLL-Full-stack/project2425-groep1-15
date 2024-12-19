import Header from "@/components/header";
import PostService from "@/services/PostService";
import { Post, User } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostStyles from "../../styles/Posts.module.css";
import OverViewTemp from "@/components/posts/postOverview";
import AchievementSection from "@/components/achievements/achievementSection";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginStyles from "../../styles/Login.module.css";

const Posts: React.FC = () => {
  const { t } = useTranslation();

  const [posts, setPosts] = useState<Array<Post>>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const userEmail = parsedData.email;
        const token = parsedData.token;
        setUser(await UserService.getUserByEmail(userEmail, token));
      } catch (error) {
        console.error("Error parsing session storage data:", error);
      }
    }
  };

  const getPosts = async () => {
    const userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(!!parsedData.token);
        const token = parsedData.token;
        const response = await PostService.getAllPosts(token);
        const json = await response.json();
        setPosts(json);
      } catch (error) {
        console.error("Error parsing session storage data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(!!parsedData.token);
        getUser();
      } catch (error) {
        console.error("Error parsing session storage data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>{t("posts.title")}</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={PostStyles.mainPosts}>
        {isLoggedIn === null ? (
          <p>{t("general.loading")}</p>
        ) : isLoggedIn ? (
          <div>
            <h1 className={PostStyles.title}>{t("posts.title")}</h1>
            <div className={PostStyles.tableBody}>
              <div className={PostStyles.createSection}>
                {user && <AchievementSection user={user} />}
              </div>
              {posts && user && (
                <section className={PostStyles.postSection}>
                  <OverViewTemp posts={posts} user={user} />
                </section>
              )}
              <Link href="/create" className={PostStyles.createSection}>
                <button className={PostStyles.createButton}>
                  {t("posts.createPost")}
                </button>
              </Link>
            </div>
          </div>
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

export default Posts;
