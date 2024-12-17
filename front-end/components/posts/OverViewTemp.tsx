import { useState } from "react";
import { Post } from "../../types/index";
import PostStyles from "../../styles/Posts.module.css";
import Logo from "../Logo";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: Array<Post>;
};

const PostOverviewTable: React.FC<Props> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className={PostStyles.postContainer}>
          <div className={PostStyles.TitleAndEdit}>
            <img
              className={PostStyles.pfp}
              src="/pictures/pfp.png"
              alt="pfp"
              width={100}
              height={100}
            />
            <h3 className={PostStyles.postTitle}>{post.title}</h3>
            <Link href={`/edit/${post.id}`}>
              <button className={PostStyles.edit}>Edit</button>
            </Link>
          </div>
          <Image
            className={PostStyles.postImage}
            src={`${post.image.path}`}
            alt="TestImage"
            width={500}
            height={300}
          />
          <div className={PostStyles.CommentAndGrade}>
            <p className={PostStyles.postComment}>{post.comment}</p>
            <p className={PostStyles.postGrade}>{post.boulder.grade}</p>
          </div>
          <div className={PostStyles.GymAndDate}>
            <p className={PostStyles.postGym}>
              Gym: {post.boulder.gym.gymName}
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
