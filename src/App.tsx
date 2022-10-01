import { FC, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { headerRoutes } from './routes';
import '../src/styles/main.css'
import Header from './tssrc/components/Header';
import SideBar from './tssrc/components/SideBar';
import Login from './tssrc/pages/Login';

const routes = createBrowserRouter(
    headerRoutes
);

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
                    <NotificationContainer />
                </div>
            : 
                <Login 
                    onLogin={setIsLoggedIn}
                />
            }

        </>
    );
}

export default App;