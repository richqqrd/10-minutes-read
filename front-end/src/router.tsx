import { createBrowserRouter, redirect } from "react-router-dom";
import  App from './App';
import { ErrorComponent }  from './components/Error/ErrorComponent'
import { TableHeaderComponent } from "./components/Table/TableHeaderComponent";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorComponent />,
        children: [
            {
                path: "", 
                element: <TableHeaderComponent />
            }
        ]
    }
]);