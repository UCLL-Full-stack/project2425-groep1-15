import { useState } from "react";
import { Post } from "../../types/index";
import PostStyles from "../../styles/Posts.module.css";

type Props = {
  posts: Array<Post>;
};

const PostOverviewTable: React.FC<Props> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      {posts.length > 0 && (
        <table className={PostStyles.table}>
          <thead className={PostStyles.tableHead}>
            <tr className={PostStyles.tableHead}>
              <th className={PostStyles.tableHead} scope="col">
                Title
              </th>
              <th className={PostStyles.tableHead} scope="col">
                Comment
              </th>
              <th className={PostStyles.tableHead} scope="col">
                Gym
              </th>
              <th className={PostStyles.tableHead} scope="col">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                className={PostStyles.tr}
                key={index}
                onClick={() => {
                  setSelectedPost(post);
                }}
                role="button"
              >
                <td className={PostStyles.td}>{post.title}</td>
                <td className={PostStyles.td}>{post.comment}</td>
                <td className={PostStyles.td}>{post.boulder.gym.gymName}</td>
                <td className={PostStyles.td}>
                  {new Date(post.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PostOverviewTable;
