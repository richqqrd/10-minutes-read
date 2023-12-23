import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorComponent: React.FC<{error: Error}> = ({error}) => {
    const routeError = useRouteError();
    const errorMessage = isRouteErrorResponse(routeError) ? routeError.statusText : routeError instanceof Error ? routeError.message : "An unknow error occurred";
    return ( 
        <div>
            <h1>Oops, something went wrong...</h1><div>{errorMessage}</div>
            <h1>{error?.message}</h1>
        </div>
    )
};
