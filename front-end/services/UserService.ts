import { User } from "@/types";

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const users: User[] = await response.json();
  return users;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/users/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user with email: ${email}`);
  }

  const user: User = await response.json();
  return user;
};

const UserService = {
  loginUser,
  getUserByEmail,
  getAllUsers,
};

export default UserService;
