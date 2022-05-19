import React, {useState} from "react"
const LocationContext = React.createContext()

function LocationContextProvider(props) {
    const [addLocationCount, setAddLocationCount] = useState(0)
    
    function addCount() {
        setAddLocationCount(addLocationCount + 1)
    }
    
    return (
        <LocationContext.Provider value={{addLocationCount, addCount}}>
            {props.children}
        </LocationContext.Provider>
    )
}

export {LocationContextProvider, LocationContext}