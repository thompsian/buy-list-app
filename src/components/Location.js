import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Location() {
    const [location, setLocation] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getAllLocations()
    },[])


    function getAllLocations(){
        setLoading(true)

        fetch("http://127.0.0.1:3000/locations")
        .then(res => res.json()
        .then(data => setLocation(data)))
        .catch(errors => console.log("Error fetching all Locations", errors))
        .finally(() => {setLoading(false)}) 
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
                {loading ? <li>Data is Loading</li> : location.map(locationItem => (
                    <li key = {locationItem.id}>
                        {locationItem.name}
                        <Link to={`/lists/${locationItem.id}`}>
                            <h5>Shop Here</h5>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Location;