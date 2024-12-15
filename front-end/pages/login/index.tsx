import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
import UserLoginForm from "@/components/users/UserLoginFrom";
import LoginStyles from "../../styles/Login.module.css";

const Login: React.FC = () => {
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
        <UserLoginForm />
      </main>
    </>
  );
};

export default Login;
