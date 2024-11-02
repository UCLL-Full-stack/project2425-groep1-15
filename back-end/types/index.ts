type PostInput = {
    id?: number;
    title: string;
    comment: string;
    date: Date;
};

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    numPosts: number;
};

type ClimbingGymInput = {
    id?: number;
    location: string;
    gymName: string;
};

type AchievementInput = {
    id?: number;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
};

type BoulderProblemInput = {
    id?: number;
    grade: string;
};

export { PostInput, UserInput, AchievementInput, BoulderProblemInput, ClimbingGymInput };
