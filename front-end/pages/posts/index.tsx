import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { Post, User } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostStyles from "../../styles/Posts.module.css";
import Styles from "../../styles/Home.module.css";
import OverViewTemp from "@/components/posts/OverViewTemp";
import AchievementSection from "@/components/achievements/achievementSection";
import UserService from "@/services/UserService";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Array<Post>>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const userEmail = parsedData.email;
        const token = parsedData.token;
        setUser(await UserService.getUserByEmail(userEmail));
      } catch (error) {
        console.error("Error parsing session storage data:", error);
      }
    }
  };

  const getPosts = async () => {
    const userData = sessionStorage.getItem("loggedInUser");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(!!parsedData.token);
        const token = parsedData.token;
        const response = await PostService.getAllPosts(token);
        const json = await response.json();
        setPosts(json);
      } catch (error) {
        console.error("Error parsing session storage data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
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
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>posts</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={PostStyles.mainPosts}>
        {isLoggedIn === null ? (
          <p>Loading...</p>
        ) : isLoggedIn ? (
          <div>
            <h1 className={PostStyles.title}>Posts</h1>
            <div className={PostStyles.tableBody}>
              <div className={PostStyles.createSection}>
                {user && <AchievementSection user={user} />}
              </div>
              {posts && (
                <section className={PostStyles.postSection}>
                  <OverViewTemp posts={posts} />
                </section>
              )}
              <Link href="/create" className={PostStyles.createSection}>
                <button className={PostStyles.createButton}>
                  Create new post
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p>
            Please log in <Link href="../login">here</Link> to view posts.
          </p>
        )}
      </main>
    </>
  );
};

export default Posts;
