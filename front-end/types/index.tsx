type Post = {
  id?: number;
  title: string;
  comment: string;
  date: Date;
};

type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  numPosts: number;
};

type ClimbingGym = {
  id?: number;
  location: string;
};

type Achievement = {
  id?: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard" | "extreme";
};

type BoulderProblem = {
  id?: number;
  grade: string;
};

export type { Post, User, Achievement, BoulderProblem, ClimbingGym };
