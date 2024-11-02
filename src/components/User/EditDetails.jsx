import React from "react";

function EditDetails(){
    const handleUpdate = async (e) =>{
        e.preventDefault();
        alert("signup method");
    };
    return(
        <main>
            <div className="container">
                this is edit details page
                <form className="update-form" onSubmit={handleUpdate}>
                    <input type="submit" value="Update" />
                </form>
            </div>
        </main>
    );
}
export default EditDetails