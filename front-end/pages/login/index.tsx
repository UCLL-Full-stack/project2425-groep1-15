import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import UserLoginForm from "@/components/users/UserLoginFrom";
import LoginStyles from "../../styles/Login.module.css";

const Login: React.FC = () => {
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
        <title>Login</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={LoginStyles.loginMain}>
        <section>
          {isLoggedIn === null ? (
            <p>Loading...</p>
          ) : isLoggedIn ? (
            <p>You are already logged in.</p>
          ) : (
            <UserLoginForm />
          )}
        </section>
      </main>
    </>
  );
};

export default Login;
