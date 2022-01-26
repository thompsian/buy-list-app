import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

function ItemList() {
    const [newItem, setNewItem] = useState({
        name:"",
        category:"",
        location_id:1
    })

    const [item, setItem] = useState({
        name:"",
        category:"",
        location_id:1
    })

    useEffect(() => {
        getLocationItems()
    },[])

    function getLocationItems(){
        fetch("http://127.0.0.1:3000/items")
        .then(res => res.json()
        .then(data => setItem(data)))
        .catch(errors => console.log("Error fetching all Items", errors))
    }

    const handleChange = e => {
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
            <h3>Shopping List for Location Placeholder</h3>
            <h5>Add an Item to the Shopping List</h5>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="name" value={newItem.name} onChange={handleChange}/>
                <input type="text" name="category" value={newItem.category} onChange={handleChange}/>
                <button>Add</button>
            </form>
            <ul>
                {item.map(item => (
                    <li key = {item.id}>
                        {item.name}
                        {item.category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;