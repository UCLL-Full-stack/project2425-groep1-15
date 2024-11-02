import { Post } from "@/types";

const getAllPosts = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createPost = async (postData: Post) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return await response.json();
};

const PostService = {
  getAllPosts,
  createPost,
};

export default PostService;
