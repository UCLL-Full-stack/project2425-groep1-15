import Header from "@/components/header";
import PostService from "@/services/PostService";
import { BoulderProblem, ClimbingGym, Post, Image } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import createStyle from "../../styles/Create.module.css";
import router, { useRouter } from "next/router";
import UserService from "@/services/UserService";
import ClimbingGymService from "@/services/ClimbingGymService";
import BoulderService from "@/services/BoulderProblemService";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const EditPost: React.FC = () => {
  const { t } = useTranslation();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const handelLogin = () => {
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

    const postId = id;
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);

        if (postId) {
          PostService.getPostById(Number(postId), parsedData.token)
            .then((response) => response.json())
            .then((post: Post) => setPost(post))
            .catch((error) => console.error("Error fetching post:", error));
        }
      } catch (error) {
        console.error("Error parsing session storage data:", error);
      }
    }
  };
  useEffect(() => {
    handelLogin();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (!post) return;

    const postId = post.id;

    if (typeof postId !== "number") {
      setErrorMessage(t("posts.edit.error"));
      return;
    }

    const climbingGymId = post.boulder.gym.id;
    const boulderId = post.boulder.id;

    const updatedTitle =
      (document.getElementById(t("posts.edit.form.title")) as HTMLInputElement)
        .value || post.title;
    const updatedComment =
      (
        document.getElementById(
          t("posts.edit.form.comment")
        ) as HTMLInputElement
      ).value || post.comment;
    const updatedGymName =
      (
        document.getElementById(
          t("posts.edit.form.gymname")
        ) as HTMLInputElement
      ).value || post.boulder.gym.gymName;
    const updatedGrade =
      (document.getElementById(t("posts.edit.form.grade")) as HTMLInputElement)
        .value || post.boulder.grade;
    const updatedLocation =
      (
        document.getElementById(
          t("posts.edit.form.location")
        ) as HTMLInputElement
      ).value || post.boulder.gym.location;

    try {
      let updatedImage = post.image;

      if (selectedFile) {
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
        updatedImage = { fileName: selectedFile.name, path: filename };
      }

      const updatedGym: ClimbingGym = {
        gymName: updatedGymName,
        location: updatedLocation,
      };

      const updatedBoulder: BoulderProblem = {
        grade: updatedGrade,
        gym: updatedGym,
      };

      const updatedPost: Post = {
        ...post,
        title: updatedTitle,
        comment: updatedComment,
        boulder: updatedBoulder,
        image: updatedImage,
      };

      const userData = sessionStorage.getItem("loggedInUser");
      if (userData && boulderId && climbingGymId) {
        const parsedData = JSON.parse(userData);
        const token = parsedData.token;

        await ClimbingGymService.editClimbingGym(
          updatedGym,
          climbingGymId,
          token
        );
        await BoulderService.editBoulderProblem(
          updatedBoulder,
          boulderId,
          token
        );
        await PostService.editPost(updatedPost, postId, token);

        router.push("/posts");
      } else {
        setIsLoggedIn(false);
      }
    } catch (error: any) {
      setErrorMessage(
        "An error occurred while updating the post. Please try again."
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <p>
        {t("general.login1")}
        <Link href="../login">{t("general.login2")}</Link> {t("general.login3")}
      </p>
    );
  }

  if (!post) {
    return <p>{t("general.loading")}</p>;
  }

  return (
    <>
      <div className={createStyle.fields}>
        <h1 className={createStyle.title}>{t("posts.edit.title")}</h1>
        {errorMessage && <p className={createStyle.error}>{errorMessage}</p>}
        <input
          className={createStyle.input}
          type="text"
          id="title"
          defaultValue={post.title}
          placeholder={t("posts.edit.form.title")}
        />
        <label className={createStyle.inputPicture}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <div className={createStyle.location}>
          <input
            className={createStyle.inputLocation}
            type="text"
            id="gymName"
            defaultValue={post.boulder.gym.gymName}
            placeholder={t("posts.edit.form.gymname")}
          />
          <input
            className={createStyle.inputLocation}
            type="text"
            id="location"
            defaultValue={post.boulder.gym.location}
            placeholder={t("posts.edit.form.location")}
          />
          <input
            className={createStyle.inputLocation}
            type="text"
            id="grade"
            defaultValue={post.boulder.grade}
            placeholder={t("posts.edit.form.grade")}
          />
        </div>
        <input
          className={createStyle.comment}
          type="text"
          id="comment"
          defaultValue={post.comment}
          placeholder={t("posts.edit.form.comment")}
        />
        <div className={createStyle.publishContainer}>
          <button className={createStyle.publishButton} onClick={handleUpdate}>
            {t("posts.edit.form.grade")}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPost;
