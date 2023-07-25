import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import List from './pages/List'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DataContextProvider } from './contexts/dataContext'
import { ThemeProvider , createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./components/Themes"
import styled from 'styled-components'

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
    const [theme, setTheme] = useState('light')
    console.log(theme)
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <>
        <GlobalStyle />
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
