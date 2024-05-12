import { createBrowserRouter, redirect } from "react-router-dom";
import  App from './App';
import { ErrorComponent }  from './components/Error/ErrorComponent'
import { ItemContainerComponent } from "./components/Table/ItemContainerComponent";
import { ItemDetailComponent } from "./components/Item/ItemDetailComponent";
import {EditItemDetailComponent} from './components/Item/EditItemDetailComponent'
import { AddItemComponent } from "./components/Item/AddItemComponent";
import { AboutComponent } from "./components/Footer/AboutComponent";
import { LoginComponent } from "./components/Login/LoginComponent";
import { LogoutComponent } from "./components/Logout/LogoutComponent";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorComponent error={{ name: "", message: "" }} />,
        children: [
            {
                path: "", 
                loader: () => redirect("books"),
            },

            {
                path: "books",
                element: <ItemContainerComponent />,
            },

            {
                path: "books/:isbn",
                element: <ItemDetailComponent />
            },

            { 
                path: "books/:isbn/edit",
                element: <EditItemDetailComponent />
            },

            {
                path: "books/add",
                element: <AddItemComponent />
            },

            {
                path: "about",
                element: <AboutComponent />
            },

            {
                path: "login",
                element: <LoginComponent />
            },

            {
                path: "logout",
                element: <LogoutComponent />

            }
        ]
    }
]);