import React from "react";
import "./Spots.css";

const Spots = ({ spots }) => {
    return (
        <div className="spots-container">
            {spots.length > 0 ? (
                spots.map((spot) => (
                    <div className="spot-card" key={spot.id}>
                        <img src={spot.photo} alt={spot.name} className="spot-image" />
                        <div className="spot-details">
                            <h3 className="spot-name">{spot.name}</h3>
                            <p className="spot-location">{spot.location}</p>
                            <p className="spot-price">Price: ${spot.price}/night</p>
                            <p className="spot-status">{spot.status}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-spots-message">You currently have no listings.</p>
            )}
        </div>
    );
};

export default Spots;
