import { useEffect, FC, useRef, useState } from "react";

const Header: FC = () => {

    return (
        <div>
            <div className="header">
                <a href={'/'}>
                    <img className='header-home' src={require("../../assets/logo.png")} height='48px' width='48px'></img>
                </a>
            </div>
        </div>
    );
}

export default Header