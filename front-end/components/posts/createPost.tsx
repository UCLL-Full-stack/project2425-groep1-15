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
import ImageService from "@/services/ImageService";

const CreatePosts: React.FC = () => {
  const { t } = useTranslation();

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
    setTitle(
      (document.getElementById(t("posts.create.title")) as HTMLInputElement)
        .value
    );
    setComment(
      (document.getElementById(t("posts.create.comment")) as HTMLInputElement)
        .value
    );

    setgymName(
      (document.getElementById(t("posts.create.gymname")) as HTMLInputElement)
        .value
    );
    setGrade(
      (document.getElementById(t("posts.create.grade")) as HTMLInputElement)
        .value
    );
    setLocation(
      (document.getElementById(t("posts.create.location")) as HTMLInputElement)
        .value
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
      setErrorMessage(t("posts.create.error1"));
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

      const existingImages = await ImageService.getImagesByPath(
        selectedFile.name
      );
      console.log(selectedFile.name);
      console.log(existingImages);

      let newImage: Image;

      if (existingImages.length > 0) {
        console.log("length > 0");
        newImage = {
          fileName: selectedFile.name,
          path: existingImages[0].path,
        };
        console.log(newImage);
      } else {
        console.log("length ====== 0");
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

        newImage = {
          fileName: selectedFile.name,
          path: filename,
        };
      }

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
      setErrorMessage(t("posts.create.error2"));
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
      <div className={createStyle.fields}>
        <h1 className={createStyle.title}>{t("posts.create.title")}</h1>
        {errorMessage && <p className={createStyle.error}>{errorMessage}</p>}
        <input
          className={createStyle.input}
          type="text"
          id="title"
          placeholder={t("posts.create.form.title")}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={createStyle.inputPicture}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <div className={createStyle.location}>
          <input
            className={createStyle.inputLocation}
            type="text"
            id="gymName"
            placeholder={t("posts.create.form.gymname")}
            onChange={(e) => setgymName(e.target.value)}
          />
          <input
            className={createStyle.inputLocation}
            type="text"
            id="location"
            placeholder={t("posts.create.form.location")}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className={createStyle.inputLocation}
            type="text"
            id="grade"
            placeholder={t("posts.create.form.grade")}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <input
          className={createStyle.comment}
          type="text"
          id="comment"
          placeholder={t("posts.create.form.comment")}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className={createStyle.publishContainer}>
          <button className={createStyle.publishButton} onClick={handlePublish}>
            {t("posts.create.publish")}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePosts;
