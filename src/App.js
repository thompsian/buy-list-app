import React, { useState , useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import List from './pages/List'
import Recipes from './pages/Recipes'
import SettingsPage from './pages/SettingsPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DataContextProvider } from './contexts/dataContext'
import styled, { ThemeProvider , createGlobalStyle } from "styled-components"
import storage from "local-storage-fallback"
import useMediaQuery from './hooks/useMediaQuery'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }  

    body {
        background: ${props => (props.theme.mode === "dark" ? "#0f0f0a" : "#ccccb3")};
        font-family: sans-serif;
        line-height: 1.4;
        margin: 0;
    }
`

const ContainerOuter = styled.div`
    max-width: 1900px;
    margin-left: auto;
    margin-right: auto;
`

const ContainerContent = styled.div`

`

function App() {
    
    const [theme, setTheme] = useState(getInitialTheme)
    const isDesktop = useMediaQuery('(min-width: 960px)')

    useEffect(() => {
        storage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    function getInitialTheme() {
        const savedTheme = storage.getItem('theme')

        return savedTheme ? JSON.parse(savedTheme) : {mode: 'light'}
    }

    function updateTheme(){
        setTheme(theme.mode === "dark" ? { mode: "light" } : { mode: "dark" })
    }

    return (
        <ThemeProvider theme={theme}>
        <>
        <GlobalStyle />
        <Router>
            <DataContextProvider>
            <ContainerOuter>
                <Header theme={theme} updateTheme={updateTheme} isDesktop={isDesktop}/>
                <ContainerContent>
                    <Routes>
                        <Route path="/" element={<Main/>} />
                        <Route path="/lists/:locationID" element={<List/>} />
                        <Route path="/recipes" element={<Recipes/>} />
                        <Route path="/settings" element={<SettingsPage/>} />
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
