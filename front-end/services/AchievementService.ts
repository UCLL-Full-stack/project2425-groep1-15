const getAchievementsByUserEmail = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/achievements/user/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

const AchievementService = {
  getAchievementsByUserEmail,
};

export default AchievementService;
