import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

function Location() {
    const [name, setName] = useState("")
    const [location, setLocation] = useState([])
    const { locationItem } = useParams()
    
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

    const handleDelete = (locationItem) => {
        fetch('http://127.0.0.1:3000/locations/' + locationItem.id, {
            method: 'DELETE'
        })
    }


    return (
        <div>
            <h2>Shopping Locations</h2>
            <ul>
                {location.map(locationItem => (
                    <li key = {locationItem.id}>
                        {locationItem.name}
                        <Link to={`/lists/${locationItem.id}`}>
                            <h5>Shop Here</h5>
                        </Link>
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