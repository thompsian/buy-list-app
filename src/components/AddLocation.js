import React, {useState} from 'react'

function AddLocation() {
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const locationObject = {name}

        fetch('http://127.0.0.1:3000/locations', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(locationObject)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Add A New Location:</label>
                <input type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddLocation;
