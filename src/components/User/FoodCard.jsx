import React from "react";

export default function FoodCard({ name, quantity, location, description }) {
    return (
        <div className="card shadow-xl w-96 m-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300" style={{ backgroundColor: 'slategray' }}>
            <figure>
                <img
                    src="https://images.unsplash.com/photo-1613218222876-954978a4404e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={name} // Use the name as alt text for accessibility
                    className="object-cover w-full h-48" // Ensures the image covers the area nicely
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
