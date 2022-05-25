import React, {useState , useContext} from 'react'
import {LocationContext} from '../contexts/locationContext'
import styled from 'styled-components'

const Section = styled.div`
    background-color: #f5f5f0;
    border-radius: 15px; 
    margin: 0 auto;
    padding: 15px;
`

const AddForm = styled.form`
`

const AddLabel = styled.label`
    padding: 15px;
    font-size: 18px;
`

const AddInput = styled.input`
    padding: 5px;
    font-size: 16px;
`

const AddButton = styled.button`
    padding: 10px 30px;
    text-align: center;
    font-size: 16px;
    margin: 10px;
    &:hover {
        font-weight: bold;
    }
`

function AddLocation(props) {
    const [name, setName] = useState("")
    const {addLocationCount, addCount} = useContext(LocationContext)
    const addressAPI = process.env.REACT_APP_BASE_API_URL

    const handleSubmit = (e) => {
        e.preventDefault()

        const locationObject = {name}

        fetch(`${addressAPI}/locations`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(locationObject)
        })
        .then(() => setName(""))
        .then(() => addCount())
    }

    return (
        <Section>
            <AddForm onSubmit={handleSubmit}>
                <AddLabel>Add A New Location:</AddLabel>
                <AddInput type="text" 
                    required
                    placeholder="Enter Location Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <AddButton>Add</AddButton>
            </AddForm>
        </Section>
    );
}

export default AddLocation;
