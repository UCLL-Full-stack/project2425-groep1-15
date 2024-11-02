import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { Post } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Posts: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const date = new Date();

  const handlePublish = () => {
    setTitle((document.getElementById("title") as HTMLInputElement).value);
    setComment((document.getElementById("comment") as HTMLInputElement).value);
    createPost();
  };

  const createPost = () => {
    console.log(`${title}${comment}${date}`);

    const newPost: Post = {
      title,
      comment,
      date,
    };
    PostService.createPost(newPost);
  };

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
        <h1>Create new post</h1>
        <input type="text" id="title" placeholder="title" />
        <input type="text" id="comment" placeholder="comment" />
        <button onClick={handlePublish}>publish</button>
      </main>
    </>
  );
};

export default Posts;
