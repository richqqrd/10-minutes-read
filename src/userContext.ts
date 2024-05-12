import { createContext } from "react";
import { User } from './user'

export const UserContext = createContext<User>({
    accessToken: "",
    setAccessToken: () => {},
    email: "",
    setEmail: () => {},
    id: 0, 
    setId: () => {},
    password: "",
    setPassword: () => {}

})