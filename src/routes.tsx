import {FC} from 'react';

import Root from './tssrc/pages/Root'
import NotFound from './tssrc/pages/NotFound'
import Projects from './tssrc/pages/Projects'
import Clients from './tssrc/pages/Clients'
import { RouteObject } from 'react-router-dom';

export const headerRoutes: Array<RouteObject> = [
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
    }
]