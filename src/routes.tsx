import {FC} from 'react';

import NotFound from './tssrc/pages/NotFound'
import Projects from './tssrc/pages/Projects'
import Clients from './tssrc/pages/Clients'
import Profile from './tssrc/pages/Profile'
import { RouteObject } from 'react-router-dom';
import SignUp from './tssrc/pages/SignUp';
import Login from './tssrc/pages/Login';
import Skills from './tssrc/pages/Skills';

export const appRoutes: Array<RouteObject> = [
    {
        path: "/",
        element: <Profile />,
        errorElement: <NotFound />
    },
    {
        path: "/projects",
        element: <Projects /> 
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/skills",
        element: <Skills />
    }
]

export const outsideRoutes: Array<RouteObject> = [
    {
        path: "/",
        element: <Login />,
        errorElement: <Login />
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