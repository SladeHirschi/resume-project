import { FC, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import { appRoutes, outsideRoutes } from './routes';
import '../src/styles/main.css'
import Header from './tssrc/components/Header';
import SideBar from './tssrc/components/SideBar';

const routes = createBrowserRouter(
    appRoutes
);

const nonAuthenticatedRoutes = createBrowserRouter(
    outsideRoutes
)

const App: FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        var loggedIn = window.sessionStorage.getItem("loggedIn");
        if (loggedIn === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            {isLoggedIn ?
                <div className='h-100 w-100'>
                    <Header />
                    <div className='d-flex w-100 h-100'>
                        <SideBar />
                        <div className='content'>
                            <RouterProvider router={routes} />
                        </div>
                    </div>
                </div>
                :
                <div className='w-100 h-100'>
                    <RouterProvider router={nonAuthenticatedRoutes} />
                </div>
            }
            <NotificationContainer />
        </>
    );
}

export default App;