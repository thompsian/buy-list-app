import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {ItemContext} from '../contexts/itemContext'
import styled from 'styled-components'

const Section = styled.div`
    border-radius: 15px; 
    margin: 0 auto;
    padding: 15px;
`

const ListSection = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`
const ListItem = styled.li`
    display:flex;
    border-style: solid;
    border-width: 1px;
    border-radius: 15px; 
    margin: 5px;
`
const StyledButton = styled.button`
    padding: 8px 25px;
    text-align: center;
    font-size: 16px;
    margin: 10px;
    margin-left: auto;
`

const StyledParagraph = styled.p`
    flex: 1;
    padding: 5px;
`

function ItemList() {
    const { locationID } = useParams()
    const [loading, setLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0)
    const {addItemCount} = useContext(ItemContext)
    const addressAPI = process.env.REACT_APP_BASE_API_URL

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

        fetch(`${addressAPI}/items/`)
        .then(res => res.json()
        .then(data => setItems(data)))
        .catch(errors => console.log("Error fetching all Items", errors))
        .finally(() => {setLoading(false)}) 
    }

    const handleDeleteItem = (id) => {
        fetch(`${addressAPI}/items/${id}`, { method: 'DELETE' })
        .then(() => setDeleteCount(deleteCount + 1))
    }
    
    return (
        <Section>
            <ListSection>
                {loading ? <ListItem>Data is Loading</ListItem> : items.map(itemList => ( itemList.location_id == locationID && 
                    <ListItem key = {itemList.id}>
                        <StyledParagraph>{itemList.name}</StyledParagraph>
                        <StyledParagraph>{itemList.category}</StyledParagraph>
                        <StyledButton onClick={(e) => handleDeleteItem(itemList.id, e)}>Item In Cart</StyledButton>
                    </ListItem>
                ))}
            </ListSection>
        </Section>
    );
}

export default ItemList;