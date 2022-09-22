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
            <div className='h-100 w-100'>
                <Header />
                <div className='d-flex w-100 h-100'>
                    <SideBar />
                    <div className='content'>
                        <RouterProvider router={routes} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;