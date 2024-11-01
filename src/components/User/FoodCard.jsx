import React from "react";
export default function FoodCard({name, quantity, location}){
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '10px',
        backgroundColor: '#f9f9f9',
    };
    const textStyle = {
        color: '#333',
        fontSize: '16px',
    };

    return(
        <div className="container" style={cardStyle}>
            <p style={textStyle}>{name}</p>
            <p style={textStyle}>{quantity}</p>
            <p style={textStyle}>{location}</p>
        </div>
    );
}