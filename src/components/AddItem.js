import React, { useState , useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {DataContext} from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    background-color: #f5f5f0;
    border-radius: 15px; 
    margin: 0 auto;
    padding: 0.75em;
`
const Title = styled.h3`
    font-size: 1.5rem;
    margin: 0;
    text-align: center;
`
const SubTitle = styled.h5`
    text-align: left;
    margin: 0;
    padding: 0.25em;
    font-size: 0.9rem;
`
const StyledForm = styled.form`
    display: flex;

    @media (max-width: 850px) {
        flex-direction: column;
    }
`
const StyledButton = styled.button`
    padding: .5em 2em;
    text-align: center;
    font-size: 1rem;
    margin-left: auto;
    &:hover {
        border-color:green;
    }
`
const StyledLabel = styled.label`
    padding: .5em;
    font-size: 1rem;
    white-space: nowrap;
`
const StyledInput = styled.input`
    padding: .5em;
    font-size: 1rem;
    flex: 1;
`

function AddItem(props) {
    const { locationID } = useParams()
    const [locationInfo, setLocationInfo] = useState()
    const [loading, setLoading] = useState(true)
    const { addItemCount, addCount } = useContext(DataContext)
    const addressAPI = process.env.REACT_APP_BASE_API_URL

    const [newItem, setNewItem] = useState({
        name:"",
        category:"",
        location_id: locationID
    })

    useEffect(() => {
        getLocationInfo()
    },[])

    function getLocationInfo(){
        setLoading(true)

        fetch(`${addressAPI}/locations/${locationID}`)
        .then(res => res.json()
        .then(data => setLocationInfo(data)))
        .catch(errors => console.log("Error fetching location information", errors))
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

        fetch(`${addressAPI}/items`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newItem)
        })
        .then(() => setNewItem({name:"",category:"",location_id: locationID}))
        .then(() => addCount())
    }

    return (
        <Section>
            {loading ? <Title>Data is Loading</Title>:<Title>Location: {locationInfo[0].name}</Title>}
            <SubTitle>Add an Item to the Shopping List:</SubTitle>
            <StyledForm onSubmit={handleAddSubmit}>
                <StyledLabel>Item Name:</StyledLabel>
                <StyledInput type="text" required placeholder = "Enter Item Name" name="name" value={newItem.name} onChange={handleChange}/>
                <StyledLabel>Item Category:</StyledLabel>
                <StyledInput type="text" placeholder = "Enter Item Category" name="category" value={newItem.category} onChange={handleChange}/>
                <StyledButton>Add</StyledButton>
            </StyledForm>
        </Section>
    );
}

export default AddItem;