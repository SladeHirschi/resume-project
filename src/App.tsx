import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Home from './tssrc/pages/Root'
import NotFound from './tssrc/pages/NotFound'
import ClientList from './tssrc/pages/ClientList'

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />,
            errorElement: <NotFound />,
        },
        {
            path: "/clients",
            element: <ClientList />,
        }
    ]
);
const App: FC = () => {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default App;