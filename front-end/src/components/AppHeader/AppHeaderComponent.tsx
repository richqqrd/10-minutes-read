import React from 'react';
import logo from '../../10-minutes-read-logo.png'

export const AppHeaderComponent = function(){
    return ( 
        <div className="App-header-content">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">10-minutes-read</h1>
        </div>
    )
};
