import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const LogoutRoute = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.setAccessToken) {
            user.setAccessToken("");

            const redirectTimer = setTimeout(() => {
                navigate('/books');
            }, 500);

            return () => clearTimeout(redirectTimer);
        } else {
            navigate('/books');
        }
    }, [user, navigate]);

    return (
        <div className="flex items-center justify-center h-40">
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Logging Out</h2>
                <p>You are being logged out and redirected...</p>
            </div>
        </div>
    );
};

export default LogoutRoute;