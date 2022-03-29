import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AddItem() {
    const { locationID } = useParams()
    const [locationInfo, setLocationInfo] = useState([])
    const [loading, setLoading] = useState(true)

    const [newItem, setNewItem] = useState({
        name:"",
        category:"",
        location_id: locationID
    })

    useEffect(() => {
        getLocationInfo()
    },[])

    function getLocationInfo(){
        setLoading(true)

        fetch("http://127.0.0.1:3000/locations/" + locationID)
        .then(res => res.json()
        .then(data => setLocationInfo(data)))
        .catch(errors => console.log("Error fetching location information", errors))
        .finally(() => {setLoading(false)}) 
    }

    const handleChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]:e.target.value
        })
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()

        fetch('http://127.0.0.1:3000/items', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newItem)
        })
    }

    return (
        <div>
            {loading ? <h3>Data is Loading</h3>:<h3>Shopping List for {locationInfo.name}</h3>}
            <h5>Add an Item to the Shopping List</h5>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="name" value={newItem.name} onChange={handleChange}/>
                <input type="text" name="category" value={newItem.category} onChange={handleChange}/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddItem;