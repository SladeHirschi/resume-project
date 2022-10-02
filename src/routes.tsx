import {FC} from 'react';

import Root from './tssrc/pages/Root'
import NotFound from './tssrc/pages/NotFound'
import Projects from './tssrc/pages/Projects'
import Clients from './tssrc/pages/Clients'
import Profile from './tssrc/pages/Profile'
import { RouteObject } from 'react-router-dom';
import SignUp from './tssrc/pages/SignUp';
import Login from './tssrc/pages/Login';

export const appRoutes: Array<RouteObject> = [
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />
    },
    {
        path: "/projects",
        element: <Projects />
    },
    {
        path: "/clients",
        element: <Clients />
    },
    {
        path: "/profile",
        element: <Profile />
    }
]

export const outsideRoutes: Array<RouteObject> = [
    {
        path: "/",
        element: <Login />,
        errorElement: <NotFound />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signUp",
        element: <SignUp />
    },
]