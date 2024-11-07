import React, { useState } from 'react';
import './css/Modal.css'; // Ensure you have the styles in this file
import axios from 'axios';

const ImageUploadModal = ({ isOpen, onClose, userID, imageFile}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (selectedFile) {
            const formData = new FormData();
            formData.append("userID", userID);  // Add user ID to FormData
            formData.append("attachmentLocation", selectedFile);  // Add file to FormData
    
            // Log the content of FormData for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }
    
            try {
                // Send the formData to the server using axios
                const response = await axios.post("http://localhost:5000/images/insertImage", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"  // Axios handles this automatically, but can be explicitly specified
                    }
                });
                console.log("Image uploaded successfully:", response.data);
                alert('Image uploaded successfully');
            } catch (error) {
                // Handle errors during the upload
                console.error("Error uploading image:", error);
                alert('Error uploading image');
            }
        } else {
            // Alert if no file is selected
            alert("Please select an image first.");
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
