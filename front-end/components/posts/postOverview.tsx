import { useState } from "react";
import { Post, User } from "../../types/index";
import PostStyles from "../../styles/Posts.module.css";
import Logo from "../Logo";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

type Props = {
  posts: Array<Post>;
  user: User;
  pushDelete: (id: number) => Promise<void>;
};

const PostOverviewTable: React.FC<Props> = ({ posts, user, pushDelete }) => {
  const { t } = useTranslation();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number | undefined) => {
    if (!id) {
      setErrorMessage(t("posts.create.error2"));
      return;
    }
    setErrorMessage("");
    setDeleting(id);
    try {
      await pushDelete(id);
    } catch (error) {
      setErrorMessage(t("posts.create.error2"));
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className={PostStyles.postContainer}>
          <div className={PostStyles.TitleAndEdit}>
            <div className={PostStyles.pfpAndName}>
              <img
                className={PostStyles.pfp}
                src="/pictures/pfp.png"
                alt="pfp"
                width={100}
                height={100}
              />
              <p className={PostStyles.userName}>{post.user.name}</p>
            </div>
            <h3 className={PostStyles.postTitle}>
              {post.user.role === "VIP" ? (
                <Image
                  className={PostStyles.vip}
                  src={`/pictures/vip.png`}
                  alt="TestImage"
                  width={500}
                  height={300}
                />
              ) : (
                ""
              )}{" "}
              {post.title}
            </h3>
            {post.user.email === user.email ? (
              <Link href={`/edit/${post.id}`} className={PostStyles.edit}>
                <Image
                  src="/pictures/edit.png"
                  alt="Edit icon"
                  width={50}
                  height={50}
                  className={PostStyles.editImage}
                ></Image>
              </Link>
            ) : (
              <p className={PostStyles.emptyP}></p>
            )}
            {user.role == "admin" ? (
              <Image
                src="/pictures/delete.png"
                alt="Delete icon"
                onClick={() => handleDelete(post.id)}
                width={50}
                height={50}
                className={PostStyles.delete}
              ></Image>
            ) : null}
          </div>
          <Image
            className={PostStyles.postImage}
            src={`${post.image.path}`}
            alt="Image of the Post"
            width={500}
            height={300}
          />
          <div className={PostStyles.CommentAndGrade}>
            <p className={PostStyles.postComment}>{post.comment}</p>
            <p className={PostStyles.postGrade}>{post.boulder.grade}</p>
          </div>
          <div className={PostStyles.GymAndDate}>
            <p className={PostStyles.postGym}>
              {t("posts.gym")} {post.boulder.gym.gymName}
            </p>
            <p className={PostStyles.postDate}>
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostOverviewTable;
