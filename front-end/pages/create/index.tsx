import Header from "@/components/header";
import PostOverviewTable from "@/components/posts/postOverviewTable";
import PostService from "@/services/PostService";
import { BoulderProblem, ClimbingGym, Post, Image } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import postStyle from "../../styles/Posts.module.css";
import createStyle from "../../styles/Create.module.css";
import ClimbingGymService from "@/services/ClimbingGymService";
import BoulderService from "@/services/BoulderProblemService";
import Link from "next/link";
import router from "next/router";
import { text } from "stream/consumers";
import UserService from "@/services/UserService";

const Posts: React.FC = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [gymName, setgymName] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const date = new Date();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const setStates = () => {
    setTitle((document.getElementById("title") as HTMLInputElement).value);
    setComment((document.getElementById("comment") as HTMLInputElement).value);

    setgymName((document.getElementById("gymName") as HTMLInputElement).value);
    setGrade((document.getElementById("grade") as HTMLInputElement).value);
    setLocation(
      (document.getElementById("location") as HTMLInputElement).value
    );
  };

  const handlePublish = async () => {
    setErrorMessage("");
    if (
      !title ||
      !comment ||
      !gymName ||
      !grade ||
      !location ||
      !selectedFile
    ) {
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

      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed.");
      }

      const { filename } = await uploadResponse.json();

      const newImage: Image = {
        fileName: selectedFile.name,
        path: filename,
      };

      const userData = sessionStorage.getItem("loggedInUser");

      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setIsLoggedIn(!!parsedData.token);
          const token = parsedData.token;

          const existingUser = await UserService.getUserByEmail(
            parsedData.email
          );
          if (!existingUser) {
            throw new Error("User does not exist.");
          }

          const newPost: Post = {
            title: title,
            comment: comment,
            date: date,
            boulder: newBoulder,
            image: newImage,
            user: existingUser,
          };

          console.log(newPost);

          await ClimbingGymService.createClimbingGym(newGym, token);
          await BoulderService.createBoulderProblem(newBoulder, token);
          await PostService.createPost(newPost, token);

          router.push("/posts");
        } catch (error) {
          console.error("Error parsing session storage data:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error: any) {
      setErrorMessage(
        "An error occurred while creating the post. Please try again."
      );
    }
  };

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
        <title>posts</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main>
        <section>
          {isLoggedIn === null ? (
            <p>Loading...</p>
          ) : isLoggedIn ? (
            <div className={createStyle.fields}>
              <h1 className={createStyle.title}>New post</h1>
              {errorMessage && (
                <p className={createStyle.error}>{errorMessage}</p>
              )}
              <input
                className={createStyle.input}
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className={createStyle.inputPicture}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <div className={createStyle.location}>
                <input
                  className={createStyle.inputLocation}
                  type="text"
                  id="gymName"
                  placeholder="Gym Name"
                  onChange={(e) => setgymName(e.target.value)}
                />
                <input
                  className={createStyle.inputLocation}
                  type="text"
                  id="location"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input
                  className={createStyle.inputLocation}
                  type="text"
                  id="grade"
                  placeholder="Grade"
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
              <input
                className={createStyle.comment}
                type="text"
                id="comment"
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
              />
              <div className={createStyle.publishContainer}>
                <button
                  className={createStyle.publishButton}
                  onClick={handlePublish}
                >
                  publish
                </button>
              </div>
            </div>
          ) : (
            <p>
              Please log in <Link href="../login">here</Link> to create a post.
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Posts;
