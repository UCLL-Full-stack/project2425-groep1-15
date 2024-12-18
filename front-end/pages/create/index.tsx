import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { BoulderProblem, ClimbingGym, Post, Image } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import postStyle from "../../styles/Posts.module.css";
import createStyle from "../../styles/Create.module.css";
import ClimbingGymService from "@/services/ClimbingGymService";
import BoulderService from "@/services/BoulderProblemService";
import Link from "next/link";
import router from "next/router";
import { text } from "stream/consumers";
import UserService from "@/services/UserService";
import CreatePosts from "@/components/posts/createPost";
import { t } from "i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Posts: React.FC = () => {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(!!parsedData.token);
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
      <main>
        <section>
          {isLoggedIn === null ? (
            <p>{t("general.loading")}</p>
          ) : isLoggedIn ? (
            <CreatePosts />
          ) : (
            <p>
              {t("general.login1")}
              <Link href="../login">{t("general.login2")}</Link>{" "}
              {t("general.login3")}
            </p>
          )}
        </section>
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
