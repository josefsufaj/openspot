import React, { useState } from "react";
import "./SpotForm.css";

const SpotForm = ({ marker, onSave, onCancel }) => {
    const [name, setName] = useState(marker?.name || "");
    const [description, setDescription] = useState(marker?.description || "");
    const [price, setPrice] = useState(marker?.price || "");
    const [photo, setPhoto] = useState(marker?.photo || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, description, price, photo });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(reader.result); // Convert image to Base64 for preview and storage
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setName(marker?.name || "");
        setDescription(marker?.description || "");
        setPrice(marker?.price || "");
        setPhoto(marker?.photo || "");
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="spot-form">
            <h3>Create Spot</h3>

            <div className="form-group">
                <label htmlFor="name">Spot Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter spot name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a brief description"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price (per night)</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    capture="camera"
                    onChange={handlePhotoUpload}
                    required
                />
                {photo && (
                    <img
                        src={photo}
                        alt="Spot preview"
                        className="photo-preview"
                    />
                )}
            </div>

            <div className="form-actions">
                <button type="submit" className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default SpotForm;
