import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import CreatePostPage from "@/components/posts/ceatePostPage";
import Header from "@/components/header";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginStyles from "../../styles/Login.module.css";

const PostsPage: React.FC = () => {
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
      <Header />
      <main>
        <section>
          {isLoggedIn === null ? (
            <p>{t("general.loading")}</p>
          ) : isLoggedIn ? (
            <CreatePostPage />
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

export default PostsPage;
