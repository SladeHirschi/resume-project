import { FC, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../src/styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { headerRoutes } from './routes';
import Header from './tssrc/components/Header';
import SideBar from './tssrc/components/SideBar';

const routes = createBrowserRouter(
    headerRoutes
);

const App: FC = () => {

    return (
        <>
            <div className='d-flex flex-column h-100 w-100'>
                <div className='sticky-top'>
                    <div>
                        <Header/>
                    </div>
                </div>
                <div className='d-flex flex-grow-1' >
                    <div>
                        <SideBar/>
                    </div>
                    <div className='flex-grow-1'>
                        <RouterProvider router={routes} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;