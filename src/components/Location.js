import React, {useState} from 'react';

function Location() {
    const [location, setLocation] = useState("")
    
    function handleChange(e){
        const {value} = e.target
        setLocation(value)
    }

    console.log(location)
    return (
        <div>
            <h2>Shopping Locations</h2>
            <input
                type="text"
                onChange={handleChange}
                value={location}
            />
            <button>Submit</button>
        </div>
    );
}

export default Location;