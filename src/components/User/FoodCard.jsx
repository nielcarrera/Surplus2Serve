import React from "react";
import { useNavigate } from "react-router-dom";

<<<<<<< Updated upstream
export default function FoodCard({ id, name, quantity, location, description, editHandler, archiveHandler }) {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`/foodFeed/${id}`);
    };
    return (
        <div 
            className="card shadow-xl w-96 m-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer" 
            style={{ backgroundColor: 'slategray' }}
            onClick={handleOnClick}
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
=======
export default function FoodCard({
  name,
  quantity,
  location,
  description,
  id,
}) {
  return (
    <div
      className="card m-4 w-96 transform shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: "slategray" }}
    >
      <figure>
        <img
          src="https://images.unsplash.com/photo-1613218222876-954978a4404e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={name} // Use the name as alt text for accessibility
          className="h-48 w-full object-cover" // Ensures the image covers the area nicely
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{name}</h2>
        <p className="text-gray-300">Quantity: {quantity}</p>
        <div className="card-actions justify-end text-gray-200">
          <div className="badge badge-outline">{location}</div>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
}
