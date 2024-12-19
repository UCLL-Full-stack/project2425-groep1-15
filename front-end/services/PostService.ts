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

const getPostById = async (id: number, token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
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

const editPost = async (
  updatedPost: Post,
  postId: number,
  token: string
): Promise<Post> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
};

const getPostsByUserEmail = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/user/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);

  return await response.json();
};

const deletePost = async (id: number, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete post with ID ${id}: ${response.status}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};

const PostService = {
  getAllPosts,
  createPost,
  editPost,
  getPostsByUserEmail,
  getPostById,
  deletePost,
};

export default PostService;
