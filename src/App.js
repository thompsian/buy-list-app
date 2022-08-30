import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import List from './pages/List'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {DataContextProvider} from './contexts/dataContext'
import styled from 'styled-components'

const ContainerOuter = styled.div`

`

const ContainerContent = styled.div`

`

function App() {
    return (
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
    );
}

export default App;
