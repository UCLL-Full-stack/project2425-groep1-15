import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { Post } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
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
        <h1>Posts</h1>

        {posts && (
          <section>
            <PostOverviewTable posts={posts} />
          </section>
        )}
        <Link href="/create">
          <button>Create new post</button>
        </Link>
      </main>
    </>
  );
};

export default Posts;
