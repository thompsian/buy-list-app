import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    margin: 0 auto;
    padding: 1em;
`

const TitleSection = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 650px) {
        flex-direction: column;
        align-items: stretch;
    }
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
`

const SortButton = styled.button`
    font-size: 1rem;
    padding: .7em 2em;
    text-align: center;
    margin-left: auto;
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
const Label = styled.label`
    font-size: 1.5rem;
    margin: 0;
    text-align: left;
    padding 0 1em 0 0;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`

const ListSection = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`
const ListItem = styled.li`
    display: flex;
    background-color: ${props => (props.theme.mode === "dark" ? "#4d4d33" : "#f5f5f0")};
    border-radius: 15px; 
    margin: 0.5em;
    padding: 1.5em;
`
const LocationName = styled.h4`
    text-align: center
    font-size: 3rem;
    font-weight: bold;
    white-space: nowrap;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const StyledLink = styled(Link)`  
    color: Black;
    background: #adad85;
    text-decoration: none;
    border-radius: 15px;
    padding .25em 1em;
    margin-right: auto;
    font-size: 1rem;
    white-space: nowrap;
    &:hover {
        background: #ccccb3;
     }
    &:focus {
        background: #ccccb3;
     }
`;

const DeleteButton = styled.button`
    padding: .5em 1.5em;
    text-align: center;
    font-size: 1rem;
    margin: .5m;
    border-radius: 3rem;
    &:hover {
       cursor: pointer;
    }
    margin-left: auto;
    white-space: nowrap;
    background: ${props => (props.theme.mode === "dark" ? "#ffb3b3" : "#4d0000")};
    color: ${props => (props.theme.mode === "dark" ? "#000000" : "#ffffff")};
    &:hover {
        background: ${props => (props.theme.mode === "dark" ? "#ffcccc" : "#800000")};
    }
    &:focus {
        background: ${props => (props.theme.mode === "dark" ? "#ffcccc" : "#800000")};
    }
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
    border-radius: 3rem;
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
const EmptyLoadMoreDiv = styled.div`
`

function Location() {
    const [location, setLocation] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0)
    const [sortingType, setSortingType] = useState(0)
    const [noOfLocations, setNoOfLocations] = useState(4)
    const {addLocationCount} = useContext(DataContext)
    const addressAPI = process.env.REACT_APP_BASE_API_URL
    
    useEffect(() => {
        getAllLocations()
    },[deleteCount, addLocationCount])

    function getAllLocations(){
        setIsLoading(true)
        fetch(`${addressAPI}/locations`)
        .then(res => res.json()
        .then(data => setLocation(data)))
        .catch(errors => console.log("Error fetching all Locations", errors))
        .finally(() => {setIsLoading(false)})   
    }

    const slicedLocation = location.slice(0,noOfLocations)

    const handleLoadMore = () => {
        setNoOfLocations(noOfLocations + noOfLocations)
    }

    const handleDelete = (id) => {
        fetch(`${addressAPI}/locations/${id}`, { method: 'DELETE' })
        .then(res => {
            if(!res.ok){
                throw alert('Items still in this Shopping list. Must be empty to delete the Location')
            }
        })
        .then(() => setDeleteCount(deleteCount + 1))
        .catch(errors => console.log("Error deleting Location", errors))
    }

    function handleSort(){
        if (sortingType === "0") {
            const byID = [...location].sort((a,b) => a.id - b.id)
            setLocation(byID)
        }
        else if (sortingType === "1") {
            const aToZ = [...location].sort((a,b) => a.name > b.name ? 1 : -1)
            setLocation(aToZ)
        }
        else if (sortingType === "2") {
            const ZtoA = [...location].sort((a,b) => a.name > b.name ? -1 : 1)
            setLocation(ZtoA)
        }
    }

    return (
        <Section>
            <TitleSection>
                <Label htmlFor="sorttype" aria-label="Sort Locations">Locations:</Label>
                <SortSelect id="sorttype" value={sortingType} onChange={(e) => setSortingType(e.target.value)}>
                    <option value="0">Sort As-Added</option>
                    <option value="1">Sort Alphabetical A-Z</option>
                    <option value="2">Sort Alphabetical Z-A</option>
                </SortSelect>
                <SortButton onClick={(e) => handleSort()}>Sort</SortButton>
            </TitleSection>
            <ListSection aria-label="Location List">
                {isLoading ? <ListItem>Data is Loading</ListItem> : slicedLocation.map(locationItem => (
                    <ListItem key = {locationItem.id}>
                        <StyledLink to={`/lists/${locationItem.id}`}>
                            <h5>Shop Here</h5>
                        </StyledLink>
                        <LocationName>{locationItem.name}</LocationName>
                        <DeleteButton onClick={(e) => handleDelete(locationItem.id, e)}>Remove</DeleteButton>
                    </ListItem>
                ))}
            </ListSection>
            <ShowMoreSection>
                {location.length > noOfLocations ? <LoadMoreButton onClick={(e) => handleLoadMore()}>Load More</LoadMoreButton> :<EmptyLoadMoreDiv></EmptyLoadMoreDiv>}
            </ShowMoreSection>
        </Section>
    );
}

export default Location;