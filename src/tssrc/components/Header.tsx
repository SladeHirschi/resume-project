import { useEffect, FC, useRef, useState } from "react";

const Header: FC = () => {

    return (
        <div>
            <div className="header">
                <img src={require("../../assets/logo.png")} height='48px' width='48px'></img>
            </div>
        </div>
    );
}

export default Header