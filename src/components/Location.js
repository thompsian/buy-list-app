import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {LocationContext} from '../contexts/locationContext'

function Location(props) {
    const [location, setLocation] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0)
    const {addLocationCount} = useContext(LocationContext)

    
    useEffect(() => {
        getAllLocations()
    },[deleteCount, addLocationCount])


    function getAllLocations(){
        setLoading(true)

        fetch("http://127.0.0.1:3000/locations")
        .then(res => res.json()
        .then(data => setLocation(data)))
        .catch(errors => console.log("Error fetching all Locations", errors))
        .finally(() => {setLoading(false)}) 
    }

    const handleDelete = (id) => {
        fetch('http://127.0.0.1:3000/locations/' + id, { method: 'DELETE' })
        .then(() => setDeleteCount(deleteCount + 1))
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
                        <button onClick={(e) => handleDelete(locationItem.id, e)}>Delete Location</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Location;