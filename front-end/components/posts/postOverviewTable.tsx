import { useState } from "react";
import { Post } from "../../types/index";

type Props = {
  posts: Array<Post>;
};

const PostOverviewTable: React.FC<Props> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      {posts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Comment</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={index}
                onClick={() => {
                  setSelectedPost(post);
                }}
                role="button"
              >
                <td>{post.title}</td>
                <td>{post.comment}</td>
                <td>{post.date.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PostOverviewTable;
