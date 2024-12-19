import Header from "@/components/header";
import PostService from "@/services/PostService";
import { Post, User } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostStyles from "../../styles/Posts.module.css";
import AchievementSection from "@/components/achievements/achievementSection";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginStyles from "../../styles/Login.module.css";
import PostOverview from "@/components/posts/postOverview";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Posts: React.FC = () => {
  const { t } = useTranslation();

  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const fetchPosts = async (token: string) => {
    const response = await PostService.getAllPosts(token);
    return await response.json();
  };

  const fetchUser = async (email: string, token: string) => {
    return await UserService.getUserByEmail(email, token);
  };

  const { data: posts, error: postsError } = useSWR(
    token ? ["posts", token] : null,
    ([, token]) => fetchPosts(token)
  );

  const { data: user, error: userError } = useSWR(
    email && token ? ["user", email, token] : null,
    ([, email, token]) => fetchUser(email, token)
  );

  useInterval(() => {
    if (token) {
      mutate(fetchPosts(token));
    }
  }, 5000);

  const pushDelete = async (id: number) => {
    if (token) {
      try {
        await PostService.deletePost(id, token);
        mutate(fetchPosts(token));
      } catch (error) {
        console.error("Error in deletePost:", error);
      }
    }
  };

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const { email, token } = parsedData;
        setToken(token);
        setEmail(email);
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error parsing session storage data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
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
                  <PostOverview
                    posts={posts}
                    user={user}
                    pushDelete={pushDelete}
                  />
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
