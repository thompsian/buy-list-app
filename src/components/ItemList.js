import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

function ItemList() {
    const { locationID } = useParams()
    const [loading, setLoading] = useState(true)

    const [newItem, setNewItem] = useState({
        name:"",
        category:"",
        location_id: locationID
    })

    const [items, setItems] = useState({
        name:"",
        category:"",
        location_id: locationID
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

    // Adding && conditional in the item map added Warning: validateDOMNesting(...): <li> cannot appear as a descendant of <li>
    
    return (
        <div>
            <ul>
                {loading ? <li>Data is Loading</li> : items.map(itemList => ( itemList.location_id == locationID && 
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