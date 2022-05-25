import React, { useState , useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {ItemContext} from '../contexts/itemContext'
import styled from 'styled-components'

const Section = styled.div`
    background-color: #f5f5f0;
    border-radius: 15px; 
    margin: 0 auto;
    padding: 15px;
`
const Title = styled.h3`
    font-size: 22px;
    margin-top: 10px;
    text-align: left;
`
const SubTitle = styled.h5`
    margin-top: 10px;
    text-align: left;
`
const StyledForm = styled.form`

`
const StyledButton = styled.button`
    padding: 8px 20px;
    text-align: center;
    font-size: 16px;
    margin: 10px;
    &:hover {
        font-weight: bold;
    }
`
const StyledLabel = styled.label`
    padding: 5px;

`
const StyledInput = styled.input`
    margin: 5px;
`

function AddItem(props) {
    const { locationID } = useParams()
    const [locationInfo, setLocationInfo] = useState()
    const [loading, setLoading] = useState(true)
    const {addItemCount, addCount} = useContext(ItemContext)

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

        fetch("http://127.0.0.1:3000/locations/" + locationID)
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

        fetch('http://127.0.0.1:3000/items', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newItem)
        })
        .then(() => addCount())
    }

    return (
        <Section>
            {loading ? <Title>Data is Loading</Title>:<Title>Shopping List for {locationInfo[0].name}</Title>}
            <SubTitle>Add an Item to the Shopping List:</SubTitle>
            <StyledForm onSubmit={handleAddSubmit}>
                <StyledLabel>Item Name:</StyledLabel>
                <StyledInput type="text" name="name" value={newItem.name} onChange={handleChange}/>
                <StyledLabel>Item Category:</StyledLabel>
                <StyledInput type="text" name="category" value={newItem.category} onChange={handleChange}/>
                <StyledButton>Add</StyledButton>
            </StyledForm>
        </Section>
    );
}

export default AddItem;