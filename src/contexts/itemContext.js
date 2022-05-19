import React, {useState} from "react"
const ItemContext = React.createContext()

function ItemContextProvider(props) {
    const [addItemCount, setAddItemCount] = useState(0)
    
    function addCount() {
        setAddItemCount(addItemCount + 1)
    }
    
    return (
        <ItemContext.Provider value={{addItemCount, addCount}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export {ItemContextProvider, ItemContext}