type PostInput = {
    id?: number;
    title: string;
    comment: string;
    date: Date;
    boulder: BoulderProblemInput;
    image: ImageInput;
    user: UserInput;
};

type ImageInput = {
    id?: number;
    fileName: string;
    path: string;
};

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    numPosts: number;
    role?: Role;
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
    gym: ClimbingGymInput;
};

type Role = 'user' | 'owner' | 'admin';

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};

export {
    PostInput,
    UserInput,
    AchievementInput,
    BoulderProblemInput,
    ClimbingGymInput,
    Role,
    AuthenticationResponse,
};
