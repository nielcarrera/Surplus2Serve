import React from "react";
import { useParams } from "react-router-dom";
export default function SelectedFood(){
    const { id } = useParams();
    return(
        <>
        <div className="container">
            selectedFoodPage with the foodId {id}
        </div>
        </>
    );
}