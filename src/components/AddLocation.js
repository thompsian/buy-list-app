import React, { useState , useContext } from 'react'
import { DataContext } from '../contexts/dataContext'
import styled from 'styled-components'

const Section = styled.div`
    background-color: ${props => (props.theme.mode === "dark" ? "#4d4d33" : "#f5f5f0")};
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
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`

const AddInput = styled.input`
    padding: .5em;
    font-size: 1rem;
    flex: 1;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.10);
`

const AddButton = styled.button`
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
                    placeholder="Enter Location Name (max 18 char)"
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
