import React, {useState} from 'react';


const MarkerForm = ({ marker, onSave, onCancel }) => {
    const [name, setName] = useState(marker.name);
    const [description, setDescription] = useState(marker.description);
    const [photo, setPhoto] = useState(marker.photo);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, description, photo });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(reader.result); // Convert photo to Base64 for display
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        // Reset any changes and trigger the onCancel callback
        setName(marker.name || '');
        setDescription(marker.description || '');
        setPhoto(marker.photo || ''); // Retain the original photo
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} style={{width: '200px', marginTop: '10px'}}>
            <input
                type="text"
                placeholder="Spot Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{width: '100%', marginBottom: '5px'}}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{width: '100%', marginBottom: '5px', resize: "none"}}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{marginBottom: '5px'}}
                required
            />
            <button type="submit" style={{padding: '5px', cursor: 'pointer'}}>
                Save
            </button>

            <button onClick={handleCancel} style={{marginLeft: '5px', padding: '5px', cursor: 'pointer'}}>Cancel</button>
        </form>
    );
};

export default MarkerForm;