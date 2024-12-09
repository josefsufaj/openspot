import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SpotForm from "../SpotForm/SpotForm";
import './Map.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const Map = ({ spots, addSpot, updateSpot, removeSpot }) => {
    const defaultPosition = [43.466667, -80.516670];
    const [newSpot, setNewSpot] = useState(null);
    const [editingSpotId, setEditingSpotId] = useState(null); // keeping track of the spot being edited

    const newSpotRef = useRef(null);

    const AddSpot = () => {
        useMapEvents({
            click: (e) => {
                if (newSpot) return;
                const { lat, lng } = e.latlng;
                const spot = {
                    id: Date.now(),
                    position: [lat, lng],
                    name: "",
                    description: "",
                    photo: null,
                };
                addSpot(spot);
                setNewSpot(spot);
                setEditingSpotId(spot.id);
            },
        });
        return null;
    };

    const saveSpot = (updatedDetails) => {
        updateSpot(editingSpotId, updatedDetails);
        setNewSpot(null);
        setEditingSpotId(null);
    };

    const cancelNewSpot = () => {
        removeSpot(newSpot?.id);
        setNewSpot(null);
        setEditingSpotId(null);
    };

    const toggleEdit = (id) => {
        setEditingSpotId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer center={defaultPosition} zoom={10} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
                />

                {spots.map((spot) => (
                    <Marker
                        key={spot.id}
                        position={spot.position}
                        ref={(ref) => {
                            if (spot.id === newSpot?.id) {
                                newSpotRef.current = ref;
                                setTimeout(() => {
                                    if (ref) ref.openPopup();
                                }, 0);
                            }
                        }}
                    >
                        <Popup>
                            {editingSpotId === spot.id ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <SpotForm
                                        marker={spot}
                                        onSave={(updatedDetails) => saveSpot(updatedDetails)}
                                        onCancel={cancelNewSpot}
                                    />
                                </div>
                            ) : (
                                <div className={'spot-info'} onClick={(e) => e.stopPropagation()}>
                                    <h2>{spot.name || "Unnamed Spot"}</h2>
                                    {spot.photo && (
                                        <img
                                            src={spot.photo}
                                            alt="Spot"
                                            style={{
                                                width: "200px",
                                                height: "200px",
                                            }}
                                        />
                                    )}
                                    <p>{spot.description || "No description provided."}</p>
                                    <p>${spot.price} / night</p>
                                    <div className={'form-actions'}>
                                        <button
                                            onClick={() => toggleEdit(spot.id)}
                                            style={{padding: "5px", cursor: "pointer", marginRight: "5px"}}
                                            className={'cancel-button'}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => removeSpot(spot.id)}
                                            style={{padding: "5px", cursor: "pointer"}}
                                            className={'save-button'}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                </div>
                            )}
                        </Popup>
                    </Marker>
                ))}

                <AddSpot/>
            </MapContainer>
        </div>
    );
};

export default Map;
