import Header from "@/components/header";
import Head from "next/head";
import { useEffect, useState } from "react";
const Posts: React.FC = () => {
  return (
    <>
      <Head>
        <title>posts</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main></main>
    </>
  );
};

export default Posts;
