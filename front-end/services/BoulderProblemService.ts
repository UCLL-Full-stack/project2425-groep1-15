import { BoulderProblem } from "@/types";

const getAllBoulderProblems = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boulders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createBoulderProblem = async (boulderData: BoulderProblem) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boulders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
