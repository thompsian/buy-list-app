import React, {useState , useContext} from 'react'
import {DataContext} from '../contexts/dataContext'
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

function AddLocation(props) {
    const [name, setName] = useState("")
    const {addLocationCount, addCount} = useContext(DataContext)
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
