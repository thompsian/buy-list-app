import React, {useState , useContext} from 'react'
import {LocationContext} from '../contexts/locationContext'

function AddLocation(props) {
    const [name, setName] = useState("")
    const {addLocationCount, addCount} = useContext(LocationContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const locationObject = {name}

        fetch('http://127.0.0.1:3000/locations', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(locationObject)
        })
        .then(() => addCount())
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
