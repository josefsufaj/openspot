import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMap, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Taskbar.css";

const Taskbar = ({onMenuChange}) => {
    return (
        <>
            <div className={"header"}>
                <img src={"openspot.png"} alt={"OpenSpot"}/>
            </div>

            <div className={"taskbar"}>
                <button className={"taskbar-item"} onClick={() => onMenuChange("Map")}>
                    <FontAwesomeIcon icon={faMap} size="lg"/>
                    <span>Map</span>
                </button>

                <button className={"taskbar-item"} onClick={() => onMenuChange("Spots")}>
                    <FontAwesomeIcon icon={faHeart} size="lg"/>
                    <span>Spots</span>
                </button>

                <button className={"taskbar-item"} onClick={() => onMenuChange("Dashboard")}>
                    <FontAwesomeIcon icon={faUser} size="lg"/>
                    <span>Dashboard</span>
                </button>
            </div>
        </>

    );
};

export default Taskbar;
