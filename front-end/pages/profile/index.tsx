import Header from "@/components/header";
import ProfileComponent from "@/components/users/Profile";
import UserService from "@/services/UserService";
import { User } from "@/types";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const { t } = useTranslation();

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
  }, []);

  return (
    <>
      <Head>
        <title>{t("profile.title")}</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main>
        <section>
          {isLoggedIn === null ? (
            <p>{t("general.loading")}</p>
          ) : isLoggedIn && user ? (
            <ProfileComponent user={user} />
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

export default Profile;
