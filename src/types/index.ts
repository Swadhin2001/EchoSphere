export type contextType = {
    user: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: ()=> Promise<boolean>;
};

export type signUpUser = {
    username: string;
    password: string;
    name:string;
    email: string;
};

export type User ={
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
};

export type signInUser ={
    username: string,
    password: string,
};