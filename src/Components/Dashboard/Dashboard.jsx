import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faCar, faUserFriends, faCog } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">

            <div className="dashboard-item">
                <FontAwesomeIcon icon={faChartBar} size="3x" />
                <span>Earnings</span>
            </div>

            <div className="dashboard-item">
                <FontAwesomeIcon icon={faCar} size="3x" />
                <span>My Listings</span>
            </div>

            <div className="dashboard-item">
                <FontAwesomeIcon icon={faUserFriends} size="3x" />
                <span>Contact Tenants</span>
            </div>

            <div className="dashboard-item">
                <FontAwesomeIcon icon={faCog} size="3x" />
                <span>Settings</span>
            </div>

        </div>
    );
};

export default Dashboard;
