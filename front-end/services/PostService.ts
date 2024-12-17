import { Post } from "@/types";

const getAllPosts = async (token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const createPost = async (postData: Post, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return await response.json();
};

const editPost = async (postData: Post, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return await response.json();
};

const getPostsByUserEmail = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/user/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

const PostService = {
  getAllPosts,
  createPost,
  editPost,
  getPostsByUserEmail,
};

export default PostService;
