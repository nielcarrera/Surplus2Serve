import React, { useState } from 'react';
import './css/Modal.css'; // Ensure you have the styles in this file

const ImageUploadModal = ({ isOpen, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setError('');

            // Create a preview URL for the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file); // Convert file to base64 URL
        } else {
            setSelectedFile(null);
            setImagePreview('');
            setError('Please select a valid image file.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            // Handle the image submission (e.g., send to server)
            console.log('Submitting file:', selectedFile);
            onClose(); // Close the modal after submission
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Upload Image</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {error && <p className="error">{error}</p>}
                    {imagePreview && (
                        <div className="image-preview">
                            <h3>Selected Image:</h3>
                            <img src={imagePreview} alt="Selected" />
                        </div>
                    )}
                    <button type="submit" disabled={!selectedFile}>
                        Submit
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ImageUploadModal;
