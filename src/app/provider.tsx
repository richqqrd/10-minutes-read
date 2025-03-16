import React, { useState } from 'react';
import { User } from '../types/user';
import { UserContext } from '../context/userContext';

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState(0);
    const [password, setPassword] = useState("");

    const user: User = {
        accessToken,
        setAccessToken,
        email,
        setEmail,
        id,
        setId,
        password,
        setPassword
    };

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};