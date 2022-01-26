import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

function ItemList() {
    const [item, setItem] = useState({
        name:"",
        category:"",
        location_id:0
    })

    return (
        <div>
            <h3>Shopping List for Location Placeholder</h3>
            <h5>Add an Item to the Shopping List</h5>
        </div>
    );
}

export default ItemList;