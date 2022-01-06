import React, {useState, useEffect} from 'react';

function Location() {
    const [name, setName] = useState("")
    const [location, setLocation] = useState([])
    
    useEffect(() => {
        getAllLocations()
    },[])

    function getAllLocations(){
        fetch("http://127.0.0.1:3000/locations")
        .then(res => res.json()
        .then(data => setLocation(data)))
        .catch(errors => console.log("Error fetching all Locations", errors))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const locationObject = {name}

        fetch('http://127.0.0.1:3000/locations', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(locationObject)
        })
    }

    const handleDelete = (item) => {
        fetch('http://127.0.0.1:3000/locations/' + item.id, {
            method: 'DELETE'
        })
    }


    return (
        <div>
            <h2>Shopping Locations</h2>
            <ul>
                {location.map(item => (
                    <li key = {item.id}>
                        {item.name}
                        <button>Shop Here</button>
                    </li>
                ))}
            </ul>
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

export default Location;