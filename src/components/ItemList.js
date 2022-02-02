import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

function ItemList() {
    const { locationID } = useParams()
    const [loading, setLoading] = useState(true)

    const [newItem, setNewItem] = useState({
        name:"",
        category:"",
        location_id: 1
    })

    const [items, setItems] = useState({
        name:"",
        category:"",
        location_id: 1
    })

    useEffect(() => {
        getLocationItems()
    },[])

    function getLocationItems(){
        setLoading(true)

        fetch('http://127.0.0.1:3000/items/')
        .then(res => res.json()
        .then(data => setItems(data)))
        .catch(errors => console.log("Error fetching all Items", errors))
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
            <h3>Shopping List for Location Placeholder</h3>
            <h5>Add an Item to the Shopping List</h5>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="name" value={newItem.name} onChange={handleChange}/>
                <input type="text" name="category" value={newItem.category} onChange={handleChange}/>
                <button>Add</button>
            </form>
            <ul>
                {loading ? <li>Data is Loading</li> : items.map(itemList => (
                    <li key = {itemList.id}>
                        {itemList.id}
                        {itemList.name}
                        {itemList.category}
                        {itemList.location_id}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;