import { ClimbingGym } from "@/types";

const getAllClimbingGyms = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createClimbingGym = async (gymData: ClimbingGym) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gymData),
  });
  return await response.json();
};

const getClimbingGymByName = async (gymName: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/gyms/${gymName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const ClimbingGymService = {
  getAllClimbingGyms,
  createClimbingGym,
  getClimbingGymByName,
};

export default ClimbingGymService;
