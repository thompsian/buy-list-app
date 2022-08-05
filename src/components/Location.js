import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {DataContext} from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    margin: 0 auto;
    padding: 1em;
`

const TitleSection = styled.div`
    display: flex;
    align-items: center;
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
const Title = styled.h2`
    font-size: 1.5rem;
    margin: 0;
    text-align: left;
    padding 0 1em 0 0;
`

const ListSection = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`
const ListItem = styled.li`
    display: flex;
    background-color: #f5f5f0;
    border-radius: 15px; 
    margin: 0.5em;
    padding: 1.5em;
`
const LocationName = styled.h4`
    text-align: center
    font-size: 3rem;
    font-weight: bold;
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
    margin: .5em;
    &:hover {
       cursor: pointer;
    }
    margin-left: auto;
    white-space: nowrap;
`

function Location() {
    const [location, setLocation] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0)
    const [sortingType, setSortingType] = useState(0)
    const {addLocationCount} = useContext(DataContext)
    const addressAPI = process.env.REACT_APP_BASE_API_URL
    
    useEffect(() => {
        getAllLocations()
    },[deleteCount, addLocationCount])

    function getAllLocations(){
        setLoading(true)
        fetch(`${addressAPI}/locations`)
        .then(res => res.json()
        .then(data => setLocation(data)))
        .catch(errors => console.log("Error fetching all Locations", errors))
        .finally(() => {setLoading(false)})   
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
                <Title>Locations:</Title>
                <SortSelect id="Sorting Type" value={sortingType} onChange={(e) => setSortingType(e.target.value)}>
                    <option value="0">Sort As-Added</option>
                    <option value="1">Sort Alphabetical A-Z</option>
                    <option value="2">Sort Alphabetical Z-A</option>
                </SortSelect>
                <SortButton onClick={(e) => handleSort()}>Sort</SortButton>
            </TitleSection>
            <ListSection>
                {loading ? <ListItem>Data is Loading</ListItem> : location.map(locationItem => (
                    <ListItem key = {locationItem.id}>
                        <StyledLink to={`/lists/${locationItem.id}`}>
                            <h5>Shop Here</h5>
                        </StyledLink>
                        <LocationName>{locationItem.name}</LocationName>
                        <DeleteButton onClick={(e) => handleDelete(locationItem.id, e)}>Delete Location</DeleteButton>
                    </ListItem>
                ))}
            </ListSection>
        </Section>
    );
}

export default Location;