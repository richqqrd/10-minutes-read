import { useState } from 'react';
import { User } from '../types/user';
import { login } from '../utils/api';
import { FetchState } from '../types/fetchState';

export const useLoginUser = () => {
    const [state, setFetchState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);
    const [outputUser, setUser] = useState<User>();

    const loginUser = (user: User) => {
        setFetchState('loading');
        login(user).then(response => {
            setUser(response);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { outputUser, state, error, loginUser }
}