import React from 'react';

export const LoadingComponent = function(){
    return ( 
        <div className="flex items-center justify-center h-screen">
            <div className="text-4xl animate-spin">Loading...</div>
        </div>
    )
};