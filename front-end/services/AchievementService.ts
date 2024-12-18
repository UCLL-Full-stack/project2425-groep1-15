const getAchievementsByUserEmail = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/achievements/user/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

const AchievementService = {
  getAchievementsByUserEmail,
};

export default AchievementService;
