import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../domain/hooks';
import { User } from '../../user';
import { UserContext } from '../../userContext';

export const LoginComponent = function(){
    const { outputUser, state, error, loginUser } = useLoginUser();
    const user = useContext(UserContext);

    const navigate = useNavigate();



    const handleSubmit = function(ev: { preventDefault: () => void; }) {
        const input: User = {
            email: user.email,
            password: user.password
        };

        ev.preventDefault();
        loginUser(input);
    }

    const handleCancel = function() {
        navigate(`/books`); 
    }

    useEffect(() => {
        if (state === 'success') {
            user.setAccessToken!(outputUser?.accessToken!)
            navigate(`/books`); 
        }
        else if (state === "error"){
            alert('Login failed: ' + error!.message);
        }
    }, [state]);





    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='grid gap-4 mt-4 ml-4 mr-4 mb-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='font-bold'>email</label>
                        <input className="border p-2" type="text" name="email" onChange={(event) => user.setEmail!(event.target.value)} required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>password</label>
                        <input className="border p-2" type="text" name="password" onChange={(event) => user.setPassword!(event.target.value)} required />
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