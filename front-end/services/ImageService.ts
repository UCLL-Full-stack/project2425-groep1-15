const getImagesByPath = async (path: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/images/path/${path}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

const ImageService = {
  getImagesByPath,
};

export default ImageService;
