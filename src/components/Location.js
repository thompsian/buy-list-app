import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {LocationContext} from '../contexts/locationContext'
import styled from 'styled-components'

const Section = styled.div`
    border-radius: 15px; 
    margin: 0 auto;
    padding: 15px;
`
const Title = styled.h2`
    font-size: 22px;
    margin-top: 10px;
    text-align: left;
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
    margin: 5px;
    padding: 15px;
`
const LocationName = styled.h4`
    text-align: center
    font-size: 38px;
    font-weight: bold;
`
const StyledLink = styled(Link)`  
    color: Black;
    text-decoration: none;
    margin-right: auto;
    font-size: 16px;
`;

const DeleteButton = styled.button`
    padding: 8px 25px;
    text-align: center;
    font-size: 16px;
    margin: 10px;
    &:hover {
        font-weight: bold;
    }
    margin-left: auto;
`

function Location(props) {
    const [location, setLocation] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteCount, setDeleteCount] = useState(0)
    const {addLocationCount} = useContext(LocationContext)

    
    useEffect(() => {
        getAllLocations()
    },[deleteCount, addLocationCount])


    function getAllLocations(){
        setLoading(true)

        fetch("http://127.0.0.1:3000/locations")
        .then(res => res.json()
        .then(data => setLocation(data)))
        .catch(errors => console.log("Error fetching all Locations", errors))
        .finally(() => {setLoading(false)}) 
    }

    const handleDelete = (id) => {
        fetch('http://127.0.0.1:3000/locations/' + id, { method: 'DELETE' })
        .then(() => setDeleteCount(deleteCount + 1))
    }


    return (
        <Section>
            <Title>Shopping Locations:</Title>
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