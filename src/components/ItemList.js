import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {ItemContext} from '../contexts/itemContext'

function ItemList() {
    const { locationID } = useParams()
    const [loading, setLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0)
    const {addItemCount} = useContext(ItemContext)

    const [items, setItems] = useState({
        name:"",
        category:"",
        location_id: locationID
    })

    useEffect(() => {
        getLocationItems()
    },[deleteCount, addItemCount])

    function getLocationItems(){
        setLoading(true)

        fetch('http://127.0.0.1:3000/items/')
        .then(res => res.json()
        .then(data => setItems(data)))
        .catch(errors => console.log("Error fetching all Items", errors))
        .finally(() => {setLoading(false)}) 
    }

    const handleDeleteItem = (id) => {
        fetch('http://127.0.0.1:3000/items/' + id, { method: 'DELETE' })
        .then(() => setDeleteCount(deleteCount + 1))
    }
    
    return (
        <div>
            <ul>
                {loading ? <li>Data is Loading</li> : items.map(itemList => ( itemList.location_id == locationID && 
                    <li key = {itemList.id}>
                        {itemList.name}
                        {itemList.category}
                        <button onClick={(e) => handleDeleteItem(itemList.id, e)}>Item In Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;