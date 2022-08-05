import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {DataContext} from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    border-radius: 15px; 
    margin: 0 auto;
    padding: 1em;
`

const ListSection = styled.ul`
    list-style-type: none;
    padding-left: 0;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 100px;
`
const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #f5f5f0;
    border-style: solid;
    border-width: 1px;
    border-radius: 15px; 
    margin: 0.25em;
`
const StyledButton = styled.button`
    padding: 0.15em 0.6em;
    text-align: center;
    font-size: 1em;
    margin: 0 auto;
    &:hover {
        cursor: pointer;
    }
`

const StyledName = styled.p`
    padding: .2em;
    margin: 0 auto;
    font-size: 1rem;
    text-align: center;
`

const StyledCategory = styled.p`
    padding: .2em;
    margin: 0 auto;
    font-size: 0.8rem;
    text-align: center;
`

function ItemList() {
    const { locationID } = useParams()
    const [loading, setLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0)
    const {addItemCount} = useContext(DataContext)
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
                        <StyledName>{itemList.name}</StyledName>
                        <StyledCategory>{itemList.category}</StyledCategory>
                        <StyledButton onClick={(e) => handleDeleteItem(itemList.id, e)}>Remove</StyledButton>
                    </ListItem>
                ))}
            </ListSection>
        </Section>
    );
}

export default ItemList;