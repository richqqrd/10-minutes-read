import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../hooks/useAuth';
import { User } from '../../types/user';
import { UserContext } from '../../context/userContext';

const LoginRoute = () => {
    const { outputUser, state, error, loginUser } = useLoginUser();
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const input: User = {
            email: user.email,
            password: user.password
        };

        loginUser(input);
    };

    const handleCancel = () => {
        navigate('/books');
    };

    useEffect(() => {
        if (state === 'success' && outputUser?.accessToken) {
            user.setAccessToken!(outputUser.accessToken);
            navigate('/books');
        }
        else if (state === "error" && error) {
            alert('Login failed: ' + error.message);
        }
    }, [state, navigate, outputUser, user.setAccessToken, error]);

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='grid gap-4 mt-4 ml-4 mr-4 mb-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='font-bold' htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="border p-2"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(event) => user.setEmail!(event.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold' htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="border p-2"
                            type="password"
                            name="password"
                            onChange={(event) => user.setPassword!(event.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4 space-x-2 font-bold">
                    <button className="mt-3 bg-purple-600 rounded-lg text-white text-xs w-24 h-10" type="submit">Submit</button>
                    <button className="mt-3 bg-purple-600 rounded-lg text-white text-xs w-24 h-10" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default LoginRoute;