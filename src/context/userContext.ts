import { createContext } from "react";
import { User } from '../types/user';

const initialUserState: User = {
    accessToken: "",
    setAccessToken: () => { },
    email: "",
    setEmail: () => { },
    id: 0,
    setId: () => { },
    password: "",
    setPassword: () => { }
};

export const UserContext = createContext<User>(initialUserState);