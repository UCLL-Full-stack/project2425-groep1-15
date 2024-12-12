import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { Post } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostStyles from "../../styles/Posts.module.css";
import Styles from "../../styles/Home.module.css";
import OverViewTemp from "@/components/posts/OverViewTemp";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Array<Post>>();

  const getPosts = async () => {
    const response = await PostService.getAllPosts();
    const json = await response.json();
    setPosts(json);
  };

  useEffect(() => {
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
      <main>
        <h1 className={PostStyles.title}>Posts</h1>
        <div className={PostStyles.tableBody}>
          <h2 className={PostStyles.createButton}>Statistics (TBA)</h2>
          {posts && (
            <section className={PostStyles.tableSection}>
              <PostOverviewTable posts={posts} />
            </section>
          )}
          <Link href="/create">
            <button className={PostStyles.createButton}>Create new post</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Posts;
