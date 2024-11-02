import React, { useState } from "react";

function EditDetails(){
    const [location, setLocation] = useState([]);
    const handleUpdate = async (e) =>{
        e.preventDefault();
        alert("signup method");
    };
    return(
        <main>
            <div className="container">
                this is edit details page
                <form className="update-form" onSubmit={handleUpdate}>
                    <input type="text" name="" id="" value="yournema"/>
                    <input type="submit" value="Update" />
                </form>
            </div>
        </main>
    );
}
export default EditDetails