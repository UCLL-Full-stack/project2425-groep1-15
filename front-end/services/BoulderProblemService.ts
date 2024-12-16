import { BoulderProblem } from "@/types";

const getAllBoulderProblems = async (token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boulders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const createBoulderProblem = async (
  boulderData: BoulderProblem,
  token: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boulders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(boulderData),
  });
  return await response.json();
};

const BoulderService = {
  getAllBoulderProblems,
  createBoulderProblem,
};

export default BoulderService;
