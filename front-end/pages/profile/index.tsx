import Header from "@/components/header";
import ProfileComponent from "@/components/users/Profile";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
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
        <title>Profile</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main>
        <section>
          {isLoggedIn === null ? (
            <p>Loading...</p>
          ) : isLoggedIn ? (
            <ProfileComponent />
          ) : (
            <p>
              Please log in <Link href="../login">here</Link> to view your
              profile.
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Profile;
