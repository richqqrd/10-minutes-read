import React, { useContext } from 'react';
import { UserContext } from '../../userContext';
import { useNavigate } from 'react-router-dom';




export const LogoutComponent = function(){
    const user = useContext(UserContext);
    const navigate = useNavigate();
    user.setAccessToken!("");
    navigate(`/books`); 
    return (<div>LOGOUT</div>); 
};