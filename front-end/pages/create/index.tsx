import { useEffect, useState, useTransition } from "react";
import { BoulderProblem, ClimbingGym, Image, Post } from "@/types";
import ClimbingGymService from "@/services/ClimbingGymService";
import BoulderService from "@/services/BoulderProblemService";
import UserService from "@/services/UserService";
import ImageService from "@/services/ImageService";
import PostService from "@/services/PostService";
import router from "next/router";
import CreatePostComponent from "@/components/posts/createPost";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Header from "@/components/header";
import LoginStyles from "../../styles/Login.module.css";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CreatePostPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

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

  const handlePublish = async (
    title: string,
    comment: string,
    gymName: string,
    grade: string,
    location: string,
    selectedFile: File | null
  ) => {
    const userData = sessionStorage.getItem("loggedInUser");
    const date = new Date();

    if (!userData) {
      throw new Error("User not logged in");
    }

    const { email, token } = JSON.parse(userData);

    const newGym: ClimbingGym = { gymName, location };
    const newBoulder: BoulderProblem = { grade, gym: newGym };

    let newImage: Image;

    const existingImages = await ImageService.getImagesByPath(
      selectedFile!.name,
      token
    );

    if (existingImages.length > 0) {
      newImage = {
        fileName: selectedFile!.name,
        path: existingImages[0].path,
      };
    } else {
      const formData = new FormData();
      formData.append("file", selectedFile!);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed.");
      }

      const { filename } = await uploadResponse.json();
      newImage = {
        fileName: selectedFile!.name,
        path: filename,
      };
    }

    const existingUser = await UserService.getUserByEmail(email, token);
    if (!existingUser) {
      throw new Error("User does not exist.");
    }

    const newPost: Post = {
      title,
      comment,
      date,
      boulder: newBoulder,
      image: newImage,
      user: existingUser,
    };

    await ClimbingGymService.createClimbingGym(newGym, token);
    await BoulderService.createBoulderProblem(newBoulder, token);
    await PostService.createPost(newPost, token);

    router.push("/posts");
  };

  return (
    <>
      <Header />
      <main>
        <section>
          {isLoggedIn ? (
            <CreatePostComponent handlePublish={handlePublish} />
          ) : (
            <p className={LoginStyles.notLoggedIn}>
              {t("general.login1")}
              <Link href="../login">{t("general.login2")}</Link>{" "}
              {t("general.login3")}
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default CreatePostPage;
