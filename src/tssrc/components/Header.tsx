import { useEffect, FC, useRef, useState } from "react";

const Header: FC = () => {

    function destorySession(): void {
        window.sessionStorage.removeItem('jwt');
        window.location.reload();
    }

    return (
        <div>
            <div className="header">
                <div className="d-flex justify-content-between align-items-center pe-2">
                    <a href={'/'}>
                        <img className='header-home' src={require("../../assets/logo.png")} height='48px' width='48px'></img>
                    </a>
                    <button id="logout-button" className="btn btn-link header-home" onClick={() => destorySession()} style={{color: 'white'}}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Header