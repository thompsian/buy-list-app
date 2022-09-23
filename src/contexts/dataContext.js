import React, {useState} from "react"
const DataContext = React.createContext()

function DataContextProvider(props) {
    const [addLocationCount, setAddLocationCount] = useState(0)
    const [addItemCount, setAddItemCount] = useState(0)
    
    function addCount() {
        setAddLocationCount(addLocationCount + 1)
        setAddItemCount(addItemCount + 1)
    }

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light')
  }
    console.log(theme)
    return (
        <DataContext.Provider value={{addLocationCount, addItemCount, addCount , theme , toggleTheme }}>
            {props.children}
        </DataContext.Provider>
    )
}

export {DataContextProvider, DataContext}