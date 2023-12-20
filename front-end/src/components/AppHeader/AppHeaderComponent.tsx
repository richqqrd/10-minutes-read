import React from 'react';
import logo from '../../10-minutes-read-logo.png'
import { NavLink } from 'react-router-dom';

export const AppHeaderComponent = function(){
    return ( 
        <div className="flex justify-between items-center bg-gray-200 py-3 black font-bold">
            <div className="flex items-center">
                <img src={logo} className="h-10 mr-2 pl-4" alt="logo" />
                <h1>10-minutes-read</h1>
            </div>
            <div className="pr-4">
                <NavLink to="books/add" className="Add-link">Add book</NavLink>
            </div>
        </div>
    )
};
