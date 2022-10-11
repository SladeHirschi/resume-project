import { useEffect, FC, useRef } from "react";
import { MdPersonOutline, MdListAlt } from "react-icons/md";
import { TbBrandGithub } from 'react-icons/tb';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type SideBarIcon = {
    icon: any;
    link: string;
    label: string;
}

const SideBar: FC = () => {

    const sideBarList: Array<SideBarIcon> = [
        { icon: <MdPersonOutline />, link: '/profile', label: 'Profile' },
        { icon: <TbBrandGithub />, link: '/projects', label: 'Projects' },
    ];



    return (
        <div className="side-bar">
            {sideBarList.map((item, index) => {
                return (
                    <OverlayTrigger
                        key={index}
                        placement={'right'}
                        overlay={
                            <Tooltip>
                              {item.label}
                            </Tooltip>
                        }
                    >
                      <a href={item.link} key={index} className='side-bar-item' style={{color: 'black'}}>{item.icon}</a>
                    </OverlayTrigger>
                );
            })}
        </div>
    );
}

export default SideBar