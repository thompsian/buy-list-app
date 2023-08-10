import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../contexts/dataContext'
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
const Label = styled.label`
    font-size: 1.2rem;
    margin: 0;
    text-align: left;
    padding 0 1em 0 0;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`

const SortSelect = styled.select`
    flex: 1;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-right: 1em;
    padding: .5em 2em;
    cursor: pointer;
    appearance: none;
    color: #444;
    border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
    background-color: #fff;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
	  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .65em auto, 100%;

    &:hover {
        border-color: #888;
    }
    &:focus {
        border-color: #aaa;
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222;
        outline: none;
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
    cursor: pointer;
    background: ${props => (props.theme.mode === "dark" ? "#e6f2ff" : "#00264d")};
    color: ${props => (props.theme.mode === "dark" ? "#000000" : "#ffffff")};
    &:hover {
        background: ${props => (props.theme.mode === "dark" ? "#99ccff" : "#004d99")};
    }
    &:focus {
        background: ${props => (props.theme.mode === "dark" ? "#99ccff" : "#004d99")};
    }
`

const ListSection = styled.ul`
    list-style-type: none;
    padding-left: 0;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 125px;
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
    background-color: ${props => (props.theme.mode === "dark" ? "#4d4d33" : "#f5f5f0")};
`
const StyledButton = styled.button`
    padding: 0.6em 1.5em;
    text-align: center;
    font-size: 1em;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 3rem;
    background: ${props => (props.theme.mode === "dark" ? "#ffb3b3" : "#4d0000")};
    color: ${props => (props.theme.mode === "dark" ? "#000000" : "#ffffff")};
    &:hover {
        background: ${props => (props.theme.mode === "dark" ? "#ffcccc" : "#800000")};
    }
    &:focus {
        background: ${props => (props.theme.mode === "dark" ? "#ffcccc" : "#800000")};
    }
`

const StyledName = styled.p`
    padding: .2em;
    margin: 0 auto;
    font-size: 1.1rem;
    text-align: center;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis ellipsis;
    max-inline-size: 20ch;
`

const StyledCategory = styled.p`
    padding: 0;
    margin: 0 auto;
    font-size: 0.9rem;
    text-align: center;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis ellipsis;
    max-inline-size: 24ch;
`

const ShowMoreSection = styled.div`
    display: flex;
    justify-content: center;
`

const LoadMoreButton = styled.button`
    padding: .5em 1.5em;
    text-align: center;
    font-size: 1rem;
    margin: .5em;
    width: 80%;
    cursor: pointer;
    border-radius: 3rem;
    background: ${props => (props.theme.mode === "dark" ? "#e6f2ff" : "#00264d")};
    color: ${props => (props.theme.mode === "dark" ? "#000000" : "#ffffff")};
    &:hover {
        background: ${props => (props.theme.mode === "dark" ? "#99ccff" : "#004d99")};
    }
    &:focus {
        background: ${props => (props.theme.mode === "dark" ? "#99ccff" : "#004d99")};
    }
`
const EmptyLoadMoreDiv = styled.div`
`

const LoadingIcon = styled.img`
`

function ItemList() {
    const { locationID } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [noOfItems, setNoOfItems] = useState(12)
    const [deleteCount, setDeleteCount] = useState(0)
    const [sortingType, setSortingType] = useState(0)
    const { addItemCount } = useContext(DataContext)
    const addressAPI = process.env.REACT_APP_BASE_API_URL

    const [items, setItems] = useState([])

    useEffect(() => {
        getLocationItems()
    },[deleteCount, addItemCount])

    function getLocationItems(){
        setIsLoading(true)

        fetch(`${addressAPI}/items/`)
        .then(res => res.json()
        .then(data => setItems(data)))
        .catch(errors => console.log("Error fetching all Items", errors))
        .finally(() => {setIsLoading(false)}) 
    }

    const slicedItems = items.slice(0,noOfItems)

    const handleLoadMore = () => {
        setNoOfItems(noOfItems + noOfItems)
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
                <Label htmlFor="sorttype" aria-label="Sort Item List">Shopping List:</Label>
                <SortSelect id="sorttype" value={sortingType} onChange={(e) => setSortingType(e.target.value)}>
                    <option value="0">Sort As-Added</option>
                    <option value="1">Sort Item Name A-Z</option>
                    <option value="2">Sort Item Name Z-A</option>
                    <option value="3">Sort Item Category A-Z</option>
                    <option value="4">Sort Item Category Z-A</option>
                </SortSelect>
                <SortButton onClick={(e) => handleSort()}>Sort</SortButton>
            </SortSection>
            <ListSection aria-label="Item List">
                {isLoading ? <LoadingIcon src="../media/Spinner-1s-200px.svg" alt="Data is Loading" width="200" height="200"/> : slicedItems.map(itemList => ( itemList.location_id == locationID && 
                    <ListItem key = {itemList.id}>
                        <StyledName>{itemList.name}</StyledName>
                        <StyledCategory>{itemList.category}</StyledCategory>
                        <StyledButton onClick={(e) => handleDeleteItem(itemList.id, e)}>Remove</StyledButton>
                    </ListItem>
                ))}
            </ListSection>
            <ShowMoreSection>
                {items.length > noOfItems ? <LoadMoreButton onClick={(e) => handleLoadMore()}>Load More</LoadMoreButton> :<EmptyLoadMoreDiv></EmptyLoadMoreDiv>}
            </ShowMoreSection>
        </Section>
    );
}

export default ItemList;