import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import EditPost from "@/components/posts/editPost";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import LoginStyles from "../../styles/Login.module.css";

const EditPostPage: React.FC = () => {
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
        <title>{t("posts.edit.title")}</title>
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
            <EditPost />
          ) : (
            <p className={LoginStyles.notLoggedIn}>
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

export default EditPostPage;
