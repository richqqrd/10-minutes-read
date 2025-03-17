import { createBrowserRouter, redirect } from "react-router-dom";
import App from './app';
import ErrorComponent from '../components/Error/Error';
import BooksRoute from "./routes/BooksRoute";
import BookDetailRoute from "./routes/BookDetailRoute";
import EditBookRoute from './routes/EditBookRoute';
import AddBookRoute from "./routes/AddBookRoute";
import AboutRoute from "./routes/AboutRoute";
import LoginRoute from "./routes/LoginRoute";
import LogoutRoute from "./routes/LogoutRoute";

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
                element: <BooksRoute />,
            },
            {
                path: "books/:isbn",
                element: <BookDetailRoute />
            },
            {
                path: "books/:isbn/edit",
                element: <EditBookRoute />
            },
            {
                path: "books/add",
                element: <AddBookRoute />
            },
            {
                path: "about",
                element: <AboutRoute />
            },
            {
                path: "login",
                element: <LoginRoute />
            },
            {
                path: "logout",
                element: <LogoutRoute />
            }
        ]
    }
]);