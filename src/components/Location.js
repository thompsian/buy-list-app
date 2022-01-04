import React, {useState, useEffect} from 'react';

function Location() {
    const [newLocation, setNewLocation] = useState("")
    const [location, setLocation] = useState([])
    
    useEffect(() => {
        getAllLocations()
    },[])

    function handleChange(e){
        const {value} = e.target
        setNewLocation(value)
    }

    function getAllLocations(){
        fetch("http://127.0.0.1:3000/locations")
        .then(res => res.json()
        .then(data => setLocation(data)))
    }

    return (
        <div>
            <h2>Shopping Locations</h2>
            <ul>
                {location.map(item => (
                    <li key = {item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Add Location"
                onChange={handleChange}
                value={newLocation}
            />
            <button>Submit</button>
        </div>
    );
}

export default Location;