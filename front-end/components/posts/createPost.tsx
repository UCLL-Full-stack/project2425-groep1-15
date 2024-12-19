import { BoulderProblem, ClimbingGym, Image, Post, User } from "@/types";
import createStyle from "../../styles/Create.module.css";
import { useState } from "react";
import { useTranslation } from "next-i18next";

type CreatePostProps = {
  handlePublish: (
    title: string,
    comment: string,
    gymName: string,
    grade: string,
    location: string,
    selectedFile: File | null
  ) => Promise<void>;
};

const CreatePostComponent: React.FC<CreatePostProps> = ({ handlePublish }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [gymName, setGymName] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const publish = async () => {
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
    const gradePattern = /^V\d{1,2}$/;
    if (!gradePattern.test(grade)) {
      setErrorMessage(t("posts.create.gradeError"));
      return;
    }
    try {
      await handlePublish(
        title,
        comment,
        gymName,
        grade,
        location,
        selectedFile
      );
    } catch (error) {
      setErrorMessage(t("posts.create.error2"));
    }
  };

  return (
    <div className={createStyle.fields}>
      <h1 className={createStyle.title}>{t("posts.create.title")}</h1>
      {errorMessage && <p className={createStyle.error}>{errorMessage}</p>}
      <input
        className={createStyle.input}
        type="text"
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
          placeholder={t("posts.create.form.gymname")}
          onChange={(e) => setGymName(e.target.value)}
        />
        <input
          className={createStyle.inputLocation}
          type="text"
          placeholder={t("posts.create.form.location")}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className={createStyle.inputLocation}
          type="text"
          placeholder={t("posts.create.form.grade")}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <input
        className={createStyle.comment}
        type="text"
        placeholder={t("posts.create.form.comment")}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className={createStyle.publishContainer}>
        <button className={createStyle.publishButton} onClick={publish}>
          {t("posts.create.publish")}
        </button>
      </div>
    </div>
  );
};

export default CreatePostComponent;
