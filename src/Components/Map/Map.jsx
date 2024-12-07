import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerForm from "../MarkerForm/MarkerForm";

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

const MapComponent = () => {
    const defaultPosition = [43.466667, -80.516670];
    const [markers, setMarkers] = useState([]);
    const [editingMarker, setEditingMarker] = useState(null);
    const [newMarker, setNewMarker] = useState(null);
    const newMarkerRef = useRef(null);

    const AddMarker = () => {
        useMapEvents({
            click: (e) => {
                if (editingMarker || newMarker) return; // prevent adding markers while editing
                const { lat, lng } = e.latlng;
                const marker = {
                    id: Date.now(),
                    position: [lat, lng],
                    name: '',
                    description: '',
                    photo: null,
                };
                setMarkers((prevMarkers) => [...prevMarkers, marker]);
                setNewMarker(marker); // set new marker is being created
                setEditingMarker(marker.id);
            },
        });
        return null;
    };

    const saveNewMarker = (updatedDetails) => {
        setMarkers((prevMarkers) =>
            prevMarkers.map((marker) =>
                marker.id === newMarker.id ? { ...marker, ...updatedDetails } : marker
            )
        );
        setNewMarker(null); // Clear new marker state
        setEditingMarker(null);
    };

    const cancelNewMarker = () => {
        setMarkers((prevMarkers) =>
            prevMarkers.filter((marker) => marker.id !== newMarker.id)
        );
        setNewMarker(null);
        setEditingMarker(null);
    };

    const removeMarker = (id) => {
        setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== id));
        if (editingMarker === id) setEditingMarker(null);
    };

    const editMarker = (id, updatedDetails) => {
        setMarkers((prevMarkers) =>
            prevMarkers.map((marker) => (marker.id === id ? { ...marker, ...updatedDetails } : marker))
        );
        setEditingMarker(null);
    };

    const toggleEdit = (id) => {
        setEditingMarker((prevId) => (prevId === id ? null : id));
    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <MapContainer
                center={defaultPosition}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
                />

                {markers.map((marker) => (
                    <Marker key={marker.id}
                            position={marker.position}
                            ref={(ref) => {
                                if (marker.id === newMarker?.id) {
                                    newMarkerRef.current = ref;
                                    setTimeout(() => {
                                        if (ref) ref.openPopup();
                                    }, 0); // popup will immediately open when available
                                }
                            }}
                    >
                        <Popup>
                            {newMarker ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <h3>Create New Spot</h3>

                                    <MarkerForm
                                        marker={newMarker}
                                        onSave={saveNewMarker}
                                        onCancel={cancelNewMarker}
                                    />
                                </div>
                            ) : (
                                <div onClick={(e) => e.stopPropagation()}>
                                    {editingMarker === marker.id ? (
                                        // render form if editing
                                        <MarkerForm
                                            marker={marker}
                                            onSave={(updatedDetails) => editMarker(marker.id, updatedDetails)}
                                        />
                                    ) : (
                                        // render details if not editing
                                        <>
                                            <h2>{marker.name}</h2>
                                            {marker.photo && (
                                                <img
                                                    src={marker.photo}
                                                    alt="Spot"
                                                    style={{
                                                        width: '200px',
                                                        height: '200px',
                                                    }}
                                                />
                                            )}
                                            <p>{marker.description}</p>
                                            <button
                                                onClick={() => toggleEdit(marker.id)}
                                                style={{padding: '5px', cursor: 'pointer', marginRight: '5px'}}
                                            >
                                                {editingMarker === marker.id ? 'Stop Editing' : 'Edit'}
                                            </button>
                                            <button
                                                onClick={() => removeMarker(marker.id)}
                                                style={{padding: '5px', cursor: 'pointer'}}
                                            >
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                        </Popup>
                    </Marker>
                ))}

                <AddMarker/>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
