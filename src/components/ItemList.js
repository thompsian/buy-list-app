import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

function ItemList() {
    const [item, setItem] = useState({
        name:"",
        category:"",
        location_id:1
    })

    const handleChange = e => {
        setItem({
            ...item,
            [e.target.name]:e.target.value
        })
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()
        const itemObject = {item}

        fetch('http://127.0.0.1:3000/items', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(itemObject)
        })
    }

    return (
        <div>
            <h3>Shopping List for Location Placeholder</h3>
            <h5>Add an Item to the Shopping List</h5>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="name" value={item.name} onChange={handleChange}/>
                <input type="text" name="category" value={item.category} onChange={handleChange}/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ItemList;