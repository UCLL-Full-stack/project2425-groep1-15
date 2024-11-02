const getAllPosts = async () => {
  console.log("API URL:", `${process.env.NEXT_PUBLIC_API_URL}/posts`);

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const PostService = {
  getAllPosts,
};

export default PostService;
