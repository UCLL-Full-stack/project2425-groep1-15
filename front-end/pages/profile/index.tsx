import Header from "@/components/header";
import ProfileComponent from "@/components/users/Profile";
import Head from "next/head";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
  return (
    <>
      <Head>
        <title>profile</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main>
        <section>
          <ProfileComponent />
        </section>
      </main>
    </>
  );
};

export default Profile;
