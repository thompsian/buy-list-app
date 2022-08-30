import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {DataContext} from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    border-radius: 15px; 
    margin: 0 auto;
    padding: 1em;
`
const SortSection = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 650px) {
        flex-direction: column;
        align-items: stretch;
    }
`
const Title = styled.h3`
    font-size: 1.2rem;
    margin: 0;
    text-align: left;
    padding 0 1em 0 0;
`

const SortSelect = styled.select`
    flex: 1;
    font-size: 1rem;
    text-align: center;
    margin-right: 1em;
    padding: .5em 2em;

    &:hover {
        cursor: pointer;
    }
    
    @media (max-width: 650px) {
        margin-right: 0;
    }
`

const SortButton = styled.button`
    font-size: 1rem;
    padding: .5em 2em;
    text-align: center;
    margin-left: auto;

    &:hover {
        cursor: pointer;
    }
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
    const [sortingType, setSortingType] = useState(0)
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

    function handleSort(){
        if (sortingType === "0") {
            const byID = [...items].sort((a,b) => a.id - b.id)
            setItems(byID)
        }
        else if (sortingType === "1") {
            const nameAtoZ = [...items].sort((a,b) => a.name > b.name ? 1 : -1)
            setItems(nameAtoZ)
        }
        else if (sortingType === "2") {
            const nameZtoA = [...items].sort((a,b) => a.name > b.name ? -1 : 1)
            setItems(nameZtoA)
        }
        else if (sortingType === "3") {
            const CategoryAtoZ = [...items].sort((a,b) => a.category > b.category ? 1 : -1)
            setItems(CategoryAtoZ)
        }
        else if (sortingType === "4") {
            const CategoryZtoA = [...items].sort((a,b) => a.category > b.category ? -1 : 1)
            setItems(CategoryZtoA)
        }
    }
    
    return (
        <Section>
            <SortSection>
                <Title>Shopping List:</Title>
                <SortSelect id="Sorting Type" value={sortingType} onChange={(e) => setSortingType(e.target.value)}>
                    <option value="0">Sort As-Added</option>
                    <option value="1">Sort Item Name A-Z</option>
                    <option value="2">Sort Item Name Z-A</option>
                    <option value="3">Sort Item Category A-Z</option>
                    <option value="4">Sort Item Category Z-A</option>
                </SortSelect>
                <SortButton onClick={(e) => handleSort()}>Sort</SortButton>
            </SortSection>
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