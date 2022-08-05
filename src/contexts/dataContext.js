import React, {useState} from "react"
const DataContext = React.createContext()

function DataContextProvider(props) {
    const [addLocationCount, setAddLocationCount] = useState(0)
    const [addItemCount, setAddItemCount] = useState(0)
    
    function addCount() {
        setAddLocationCount(addLocationCount + 1)
        setAddItemCount(addItemCount + 1)
    }
    
    return (
        <DataContext.Provider value={{addLocationCount, addItemCount, addCount}}>
            {props.children}
        </DataContext.Provider>
    )
}

export {DataContextProvider, DataContext}