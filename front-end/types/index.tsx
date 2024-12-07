type Post = {
  id?: number;
  title: string;
  comment: string;
  date: Date;
  boulder: BoulderProblem;
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
  gymName: string;
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
  gym: ClimbingGym;
};

export type { Post, User, Achievement, BoulderProblem, ClimbingGym };
