import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { BoulderProblem, ClimbingGym, Post } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import postStyle from "../../styles/Posts.module.css";
import createStyle from "../../styles/Create.module.css";
import ClimbingGymService from "@/services/ClimbingGymService";
import BoulderService from "@/services/BoulderProblemService";
import Link from "next/link";
import router from "next/router";

const Posts: React.FC = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [gymName, setgymName] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const date = new Date();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePublish = async () => {
    setErrorMessage("");
    setTitle((document.getElementById("title") as HTMLInputElement).value);
    setComment((document.getElementById("comment") as HTMLInputElement).value);

    setgymName((document.getElementById("gymName") as HTMLInputElement).value);
    setGrade((document.getElementById("grade") as HTMLInputElement).value);
    setLocation(
      (document.getElementById("location") as HTMLInputElement).value
    );

    if (!title || !comment || !gymName || !grade || !location) {
      setErrorMessage("Please fill in all fields correctly before publishing.");
      return;
    }

    try {
      const newGym: ClimbingGym = {
        gymName: gymName,
        location: location,
      };

      const newBoulder: BoulderProblem = {
        grade: grade,
        gym: newGym,
      };

      const newPost: Post = {
        title: title,
        comment: comment,
        date: date,
        boulder: newBoulder,
      };

      await ClimbingGymService.createClimbingGym(newGym);
      await BoulderService.createBoulderProblem(newBoulder);
      await PostService.createPost(newPost);

      router.push("/posts");
    } catch (error: any) {
      setErrorMessage(
        "An error occurred while creating the post. Please try again."
      );
    }
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
          {errorMessage && <p className={createStyle.error}>{errorMessage}</p>}
          <input
            className={createStyle.input}
            type="text"
            id="title"
            placeholder="Title"
          />
          <label className={createStyle.inputPicture}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <div className={createStyle.location}>
            <input
              className={createStyle.inputLocation}
              type="text"
              id="gymName"
              placeholder="Gym Name"
            />
            <input
              className={createStyle.inputLocation}
              type="text"
              id="location"
              placeholder="Location"
            />
            <input
              className={createStyle.inputLocation}
              type="text"
              id="grade"
              placeholder="Grade"
            />
          </div>
          <input
            className={createStyle.input}
            type="text"
            id="comment"
            placeholder="Comment"
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
