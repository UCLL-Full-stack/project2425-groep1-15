import { ClimbingGym } from "@/types";

const getAllClimbingGyms = async (token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const createClimbingGym = async (gymData: ClimbingGym, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gymData),
  });
  return await response.json();
};

const getClimbingGymByName = async (gymName: string, token: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/gyms/${gymName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const editClimbingGym = async (
  updatedClimbingGym: ClimbingGym,
  climbingGymId: number,
  token: string
): Promise<ClimbingGym> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/gyms/${climbingGymId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedClimbingGym),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
};

const ClimbingGymService = {
  getAllClimbingGyms,
  createClimbingGym,
  getClimbingGymByName,
  editClimbingGym,
};

export default ClimbingGymService;
