import { createBrowserRouter, redirect } from "react-router-dom";
import  App from './App';
import { ErrorComponent }  from './components/Error/ErrorComponent'
import { TableHeaderComponent } from "./components/Table/TableHeaderComponent";
import { ItemDetailComponent } from "./components/Item/ItemDetailComponent";
import {EditItemDetailComponent} from './components/Item/EditItemDetailComponent'
import { AddItemComponent } from "./components/Table/AddItemComponent";
import { DeleteItemDetailComponent } from './components/Item/DeleteItemDetailComponent'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorComponent />,
        children: [
            {
                path: "", 
                loader: () => redirect("books"),
            },

            {
                path: "books",
                element: <TableHeaderComponent />,
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
                path: "books/:isbn/delete",
                element: <DeleteItemDetailComponent />
            }
        ]
    }
]);