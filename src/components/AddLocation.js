import React, { useState , useContext } from 'react'
import { DataContext } from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    background-color: #f5f5f0;
    border-radius: 15px; 
    margin: 0 auto;
    padding: 1em;
`

const AddForm = styled.form`
    display: flex;
    @media (max-width: 650px) {
        flex-direction: column;
    }
`

const AddLabel = styled.label`
    padding: .5em;
    font-size: 1rem;
    white-space: nowrap;
`

const AddInput = styled.input`
    padding: .5em;
    font-size: 1rem;
    flex: 1;
`

const AddButton = styled.button`
    padding: .5em 2em;
    text-align: center;
    font-size: 1rem;
    margin-left: auto;
    &:hover {
        cursor: pointer;
    }
`

function AddLocation() {
    const [name, setName] = useState("")
    const { addCount } = useContext(DataContext)
    const addressAPI = process.env.REACT_APP_BASE_API_URL

    const handleChange = (e) => {
        if (e.target.value.length === 18){
            window.alert("Location name should not exceed 18 characters")
        }
        setName(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const locationName = {name}

        fetch(`${addressAPI}/locations`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(locationName)
        })
        .then(() => setName(""))
        .then(() => addCount())
    }

    return (
        <Section>
            <AddForm aria-label="Add Location Form" onSubmit={handleSubmit}>
                <AddLabel htmlFor="addlocation">Add A New Location:</AddLabel>
                <AddInput 
                    type="text" 
                    id="addlocation"
                    required
                    placeholder="Enter Location Name"
                    value={name}
                    maxLength={18}
                    onChange={handleChange}
                />
                <AddButton aria-label="Submit the Add Location Form">Add</AddButton>
            </AddForm>
        </Section>
    );
}

export default AddLocation;
