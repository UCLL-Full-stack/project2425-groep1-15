import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { ClimbingGym, Post } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import postStyle from "../../styles/Posts.module.css";
import createStyle from "../../styles/Create.module.css";
import ClimbingGymService from "@/services/ClimbingGymService";

const Posts: React.FC = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [gymName, setgymName] = useState("");
  const [Location, setLocation] = useState("");

  const date = new Date();

  const handlePublish = async () => {
    const newTitle = (document.getElementById("title") as HTMLInputElement)
      .value;
    const newComment = (document.getElementById("comment") as HTMLInputElement)
      .value;

    const newGymName = (document.getElementById("gymName") as HTMLInputElement)
      .value;
    const newLocation = (
      document.getElementById("location") as HTMLInputElement
    ).value;

    setTitle(newTitle);
    setComment(newComment);
    setgymName(newGymName);
    setLocation(newLocation);

    const newPost: Post = {
      title: newTitle,
      comment: newComment,
      date,
    };

    const newClimbingGym: ClimbingGym = {
      location: newLocation,
      gymName: newGymName,
    };

    await PostService.createPost(newPost);
    await ClimbingGymService.createClimbingGym(newClimbingGym);
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
        <h1 className={postStyle.title}>Create new post</h1>
        <div className={createStyle.fields}>
          <input
            className={createStyle.input}
            type="text"
            id="title"
            placeholder="Title"
          />
          <input
            className={createStyle.input}
            type="text"
            id="comment"
            placeholder="Comment"
          />
          <input
            className={createStyle.input}
            type="text"
            id="gymName"
            placeholder="Gym Name"
          />
          <input
            className={createStyle.input}
            type="text"
            id="location"
            placeholder="Location"
          />
        </div>
        <div className={createStyle.publishContainer}>
          <button className={createStyle.publishButton} onClick={handlePublish}>
            publish
          </button>
        </div>
      </main>
    </>
  );
};

export default Posts;
