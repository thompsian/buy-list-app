import React, { useState , useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    background-color: ${props => (props.theme.mode === "dark" ? "#4d4d33" : "#f5f5f0")};
    border-radius: 15px; 
    margin: 0 auto;
    padding: 0.75em;
`
const Title = styled.h3`
    font-size: 1.5rem;
    margin: 0;
    text-align: center;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const SubTitle = styled.h5`
    text-align: left;
    margin: 0;
    padding: 0.25em;
    font-size: 0.9rem;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const StyledForm = styled.form`
    display: flex;

    @media (max-width: 950px) {
        flex-direction: column;
    }
`
const StyledButton = styled.button`
    padding: .7em 2em;
    text-align: center;
    font-size: 1rem;
    margin-left: auto;
    border-radius: 0 3rem 3rem 0;
    background: ${props => (props.theme.mode === "dark" ? "#99ff99" : "#004d00")};
    color: ${props => (props.theme.mode === "dark" ? "#000000" : "#ffffff")};
    cursor: pointer;
    &:hover {
        background: ${props => (props.theme.mode === "dark" ? "#ccffcc" : "#008000")};
    }
    &:focus {
        background: ${props => (props.theme.mode === "dark" ? "#ccffcc" : "#008000")};
    }
`
const StyledLabel = styled.label`
    padding: .5em;
    font-size: 1rem;
    white-space: nowrap;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const StyledInput = styled.input`
    padding: .5em;
    font-size: 1rem;
    flex: 1;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.10);
`

function AddItem() {
    const { locationID } = useParams()
    const [locationInfo, setLocationInfo] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { addCount } = useContext(DataContext)
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
        setIsLoading(true)

        fetch(`${addressAPI}/locations/${locationID}`)
        .then(res => res.json()
        .then(data => setLocationInfo(data)))
        .catch(errors => console.log("Error fetching location information", errors))
        .finally(() => {setIsLoading(false)}) 
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
            {isLoading ? <Title>Data is Loading</Title>:<Title>Location: {locationInfo[0].name}</Title>}
            <SubTitle>Add an Item to the Shopping List:</SubTitle>
            <StyledForm aria-label="Add Item Form" onSubmit={handleAddSubmit}>
                <StyledLabel htmlFor="itemname">Item Name:</StyledLabel>
                <StyledInput 
                    type="text" 
                    id="itemname" 
                    required 
                    placeholder = "Enter Item Name (22 char max)" 
                    name="name"
                    maxLength={22} 
                    value={newItem.name} 
                    onChange={handleChange}/>
                <StyledLabel htmlFor="itemcategory">Item Category:</StyledLabel>
                <StyledInput 
                    type="text" 
                    id ="itemcategory" 
                    placeholder = "Enter Item Category" 
                    name="category" 
                    value={newItem.category} 
                    onChange={handleChange}/>
                <StyledButton aria-label="Submit the Add Item Form">Add</StyledButton>
            </StyledForm>
        </Section>
    );
}

export default AddItem;