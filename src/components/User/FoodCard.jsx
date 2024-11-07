import React from "react";
import { useNavigate } from "react-router-dom";

export default function FoodCard({ ownerId ,id, name, quantity, location, description, status,editHandler, archiveHandler }) {
    const navigate = useNavigate();
    // Define the foodDetails object
    const foodDetails = {
        ownerId: ownerId,
        foodid: id,
        name: name,
        quantity: quantity,
        description: description
    };

    // Conditional click handler
    const handleOnClick = () => {
        if (id) {
            // Pass foodDetails as state
            navigate(`/foodFeed/${id}`, { state: foodDetails });
        }
    };


    return (
        <div 
            className="card shadow-xl w-96 m-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer" 
            style={{ backgroundColor: 'slategray' }}
            onClick={id ? handleOnClick : null} // Only set the onClick handler if id is not null
            aria-label={`View details for ${name}`} // For screen readers
        >
            <figure>
                <img
                    src="https://images.unsplash.com/photo-1613218222876-954978a4404e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={`${name} - ${quantity} available at ${location}`} // Descriptive alt text
                    className="object-cover w-full h-48"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-white">
                    {name}
                </h2>
                <p className="text-gray-300">Quantity: {quantity}</p>
                <div className="card-actions justify-end text-gray-200">
                    <div className="badge badge-outline">{location}</div>
                </div>
            </div>
        </div>
    );
}
