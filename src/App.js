import React, { useContext } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import List from './pages/List'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DataContextProvider } from './contexts/dataContext'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import { DataContext } from './contexts/dataContext'
import styled from 'styled-components'

const ContainerOuter = styled.div`
    max-width: 1900px;
    margin-left: auto;
    margin-right: auto;
`

const ContainerContent = styled.div`

`

function App() {
    const theme = useContext(DataContext)
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <>
        <GlobalStyles />
        <Router>
            <DataContextProvider>
            <ContainerOuter>
                <Header />
                <ContainerContent>
                    <Routes>
                        <Route path="/" element={<Main/>} />
                        <Route path="/lists/:locationID" element={<List/>} />
                    </Routes>
                </ContainerContent>
                <Footer />
            </ContainerOuter>
            </DataContextProvider>
        </Router>
        </>
        </ThemeProvider>
    );
}

export default App;
