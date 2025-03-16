import React, { useContext } from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export const Header = () => {
    const { accessToken } = useContext(UserContext);

    return (
        <header className="flex justify-between items-center bg-gray-200 py-3 black font-bold">
            <div className="flex items-center">
                <img src={logo} className="h-10 mr-2 pl-4" alt="10 Minutes Read Logo" />
                <h1>10-minutes-read</h1>
            </div>
            <nav className="pr-4">
                <NavLink to="/books" className="mr-4">All books</NavLink>
                {accessToken && <NavLink to="/books/add" className="mr-4">Add book</NavLink>}
                {accessToken ? <NavLink to="/logout">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
            </nav>
        </header>
    );
};