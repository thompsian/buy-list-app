import React, { useState , useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import List from './pages/List'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DataContextProvider } from './contexts/dataContext'
import styled, { ThemeProvider , createGlobalStyle } from "styled-components"
import storage from "local-storage-fallback"

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }  

    body {
        background: #ccccb3;
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

    console.log(theme.mode)
    return (
        <ThemeProvider theme={theme}>
        <>
        <GlobalStyle />
        <Router>
            <DataContextProvider>
            <ContainerOuter>
                <Header theme={theme} updateTheme={updateTheme}/>
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
